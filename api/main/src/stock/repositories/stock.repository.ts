import { Injectable } from '@nestjs/common';
import { FindOneOptions, In, Like, Repository } from 'typeorm';
import { Stock } from '../entities/stock.entity';
import { StockValidationService } from '../services/stockValidation.service';
import { CreateStockDto } from '../dto/create-stock.dto';

/**
 * DB 조회
 */
@Injectable()
export class StockRepository {
  private readonly TABLE_NAME = 'stock';
  constructor(
    private readonly repository: Repository<Stock>,
    private readonly stockValidationService: StockValidationService,
  ) {}

  /**
   * 심볼로 주식을 조회
   */
  async findBySymbol(
    symbol: string,
    options?: {
      includeRelations?: boolean;
    },
  ): Promise<Stock | null> {
    const queryOptions: FindOneOptions<Stock> = {
      where: {
        symbol: this.stockValidationService.normalizeSymbol(symbol),
      },
    };

    if (options?.includeRelations) {
      queryOptions.relations = {
        portfolioStocks: true,
        dividendHistory: true,
      };
    }

    return await this.repository.findOne(queryOptions);
  }

  /**
   * 여러 심볼로 주식들을 조회
   */
  async findBySymbols(symbols: string[]): Promise<Stock[]> {
    return await this.repository.find({
      where: {
        symbol: In(symbols),
      },
    });
  }

  /**
   * 주식 검색
   */
  async search(query: string, limit = 20): Promise<Stock[]> {
    const searchTerm = `%${query.trim().toUpperCase()}%`;

    return await this.repository.find({
      where: [
        {
          symbol: Like(searchTerm),
        },
        {
          companyName: Like(searchTerm),
        },
      ],
    });
  }

  /**
   * 주식을 생성합니다
   */
  async create(stockData: CreateStockDto): Promise<Stock> {
    const stock = this.repository.create(stockData);
    return await this.repository.save(stock);
  }

  /**
   * 주식을 저장합니다
   */
  async save(stock: CreateStockDto): Promise<Stock> {
    return await this.repository.save(stock);
  }

  /**
   * 주식을 삭제합니다
   */
  async remove(stock: Stock): Promise<void> {
    await this.repository.remove(stock);
  }
}

// create-stock.dto
