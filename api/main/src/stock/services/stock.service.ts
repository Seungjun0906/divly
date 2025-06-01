import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Stock } from '../entities/stock.entity';
import { StockDataService } from './stockData.service';
import { StockRepository } from '../repositories/stock.repository';
import { StockCacheService } from './stockCache.service';
import { StockValidationService } from './stockValidation.service';

/**
 * 주식 관련 비즈니스 로직과 데이터 베이스 관리를 담당하는 서비스
 *
 * 핵심 기능
 * 1. 캐싱 전략 (DB 우선, API 보조)
 * 2. 데이터베이스 CRUD 작업
 * 3. 외부 API와 DB 데이터 동기화
 * 4. 비즈니스 규칙 적용하여
 * 5. 성능 최적화
 *
 * 캐싱 전략
 * - Level 1: DB 캐시 (1시간 유효)
 * - Level 2: 외부 API 호출
 * - Level 3: 실패 시 stale 데이터 반환
 */

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly stockRepository: StockRepository,
    private readonly stockDataService: StockDataService,
    private readonly stockCacheService: StockCacheService,
    private readonly stockValidationService: StockValidationService,
  ) {}

  /**
   * 백그라운드에서 주식 데이터를 새로고침합니다
   */
  private refreshStockInBackground(symbol: string): void {
    this.fetchAndSaveStock(symbol).catch((error) => {
      this.logger.warn(
        `Background refresh failed for ${symbol}: ${error.message}`,
      );
    });
  }

  async getStock(
    symbol: string,
    options: {
      forceRefresh?: boolean;
      includeRelations?: boolean;
    } = {},
  ) {
    const normalizedSymbol =
      this.stockValidationService.normalizeSymbol(symbol);
    const { forceRefresh = false, includeRelations = false } = options;

    this.logger.log(
      `Getting stock: ${normalizedSymbol} (forceRefresh: ${forceRefresh}) ${
        includeRelations ? 'with relations' : ''
      }`,
    );

    try {
      if (!forceRefresh) {
        const cachedStock = await this.stockRepository.findBySymbol(symbol, {
          includeRelations,
        });

        if (cachedStock) {
          const cacheStatus =
            this.stockCacheService.getCacheStatus(cachedStock);

          switch (cacheStatus) {
            case 'fresh':
              this.logger.log(`Cache hit for ${symbol}`);
              return cachedStock;
            case 'stale':
              this.logger.log(`Cache stale for ${symbol}`);
              this.refreshStockInBackground(normalizedSymbol);
              return cachedStock;
            case 'expired':
              break;
          }
        }
      }

      return await this.fetchAndSaveStock(normalizedSymbol);

      // 외부 api 가져와서 저장
    } catch (error) {
      // API 실패 시 stale 데이터 반환
      return this.handleApiFallback(error, symbol, {
        includeRelations,
      });
    }
  }

  /**
   * 외부 API에서 주식 데이터 가져오기
   */
  async fetchAndSaveStock(symbol: string): Promise<Stock> {
    const normalizedSymbol =
      this.stockValidationService.normalizeSymbol(symbol);
    this.logger.log(`Fetching and saving stock data for ${normalizedSymbol}`);

    try {
      const [stockInfo, companyOverview] = await Promise.all([
        this.stockDataService.getStockInfo(normalizedSymbol),
        this.stockDataService.getCompanyOverview(normalizedSymbol),
      ]);

      // 데이터 검증
      this.stockValidationService.validateApiData(stockInfo, normalizedSymbol);

      // 기존 주식 확인
      const existingStock =
        await this.stockRepository.findBySymbol(normalizedSymbol);

      // 데이터 준비
      const stockData = this.stockValidationService.prepareStockData(
        stockInfo,
        companyOverview,
      );

      // 5. 저장 또는 업데이트
      return await this.saveOrUpdateStock(
        existingStock,
        stockData,
        normalizedSymbol,
      );

      // 저장 또는 업데이트
      // return await this.stockRepository.
    } catch (error) {
      this.logger.error(
        `Failed to fetch and save stock ${normalizedSymbol}`,
        error,
      );

      throw error;
    }
  }

  /**
   * API 실패 시 fallback 처리
   */
  private async handleApiFallback(
    error: any,
    symbol: string,
    options?: {
      includeRelations: boolean;
    },
  ): Promise<Stock> {
    this.logger.warn(`API failed for ${symbol}, trying to return stale data`);

    const staleStock = await this.stockRepository.findBySymbol(symbol, options);

    if (staleStock && this.stockCacheService.isWithinStaleLimit(staleStock)) {
      this.logger.warn(`Returning stale data for ${symbol} due to API failure`);
      return staleStock;
    }

    this.logger.error(`All methods failed for ${symbol}`, error);
    throw error;
  }

  /**
   * 주식을 저장하거나 업데이트
   */
  private async saveOrUpdateStock(
    existingStock: Stock | null,
    stockData: CreateStockDto,
    symbol: string,
  ): Promise<Stock> {
    if (existingStock) {
      // 무조건 업데이트해야하는 경우
      if (
        this.stockValidationService.shouldUpdateStock(existingStock, stockData)
      ) {
        Object.assign(existingStock, stockData);

        const savedStock = await this.stockRepository.save(existingStock);
        this.logger.log(`Updated existing stock: ${symbol}`);
        return savedStock;
      } else {
        existingStock.updatedAt = new Date();
        const savedStock = await this.stockRepository.save(existingStock);
        this.logger.log(`Refreshed timestamp for ${symbol}`);
        return savedStock;
      }
    } else {
      const newStock = await this.stockRepository.create(stockData);
      const savedStock = await this.stockRepository.save(newStock);
      this.logger.log(`Created new stock: ${symbol}`);
      return savedStock;
    }
  }

  // ==================== 기본 CRUD (단순 위임) ====================

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const normalizedSymbol = this.stockValidationService.normalizeSymbol(
      createStockDto.symbol,
    );

    const existingStock =
      await this.stockRepository.findBySymbol(normalizedSymbol);
    if (existingStock) {
      throw new BadRequestException(
        `Stock with symbol ${normalizedSymbol} already exists`,
      );
    }

    const stockData = {
      ...createStockDto,
      symbol: normalizedSymbol,
      currentPrice: this.stockValidationService.validateAndRoundPrice(
        createStockDto.currentPrice,
      ),
    };

    return await this.stockRepository.create(stockData);
  }

  async findOne(symbol: string, includeRelations = false): Promise<Stock> {
    const normalizedSymbol =
      this.stockValidationService.normalizeSymbol(symbol);
    const stock = await this.stockRepository.findBySymbol(normalizedSymbol, {
      includeRelations,
    });

    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }
    return stock;
  }

  async searchStocks(query: string, limit = 20): Promise<Stock[]> {
    if (!query || query.trim().length < 1) {
      throw new BadRequestException(
        'Search query must be at least 1 character long',
      );
    }
    return await this.stockRepository.search(query, limit);
  }
}
