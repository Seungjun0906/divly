import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CompanyOverview,
  StockInfo,
} from '../interfaces/stockDataProvider.interface';
import { Stock } from '../entities/stock.entity';
import { CreateStockDto } from '../dto/create-stock.dto';

@Injectable()
export class StockValidationService {
  /**
   * 1% 이상 변동 시 업데이트
   */
  private readonly PRICE_UPDATE_THRESHOLD = 0.01;

  /**
   * 가격을 검증하고 반올림
   */
  validateAndRoundPrice(price: number): number {
    if (!price || price <= 0) {
      throw new BadRequestException('Invalid Stock Price');
    }
    // 소수 둘째자리까지 반올림
    return Math.round(price * 100) / 100;
  }

  /**
   * 심볼을 정규화
   */
  normalizeSymbol(symbol: string): string {
    if (!symbol || typeof symbol !== 'string') {
      throw new BadRequestException('Symbol must be a non-empty string');
    }

    return symbol.trim().toUpperCase();
  }

  /**
   * API 데이터 검증
   */
  validateApiData(stockInfo: StockInfo, requestedSymbol: string): void {
    if (stockInfo.symbol != requestedSymbol) {
      throw new Error(
        `Symbol mismatch: requested ${requestedSymbol}, got ${stockInfo.symbol}`,
      );
    }

    if (stockInfo.currentPrice <= 0 || stockInfo.currentPrice > 1000000) {
      throw new Error(`Invalid price: ${stockInfo.currentPrice}`);
    }

    if (!stockInfo.companyName || stockInfo.companyName.trim().length === 0) {
      throw new Error('Company name is empty');
    }
  }

  /**
   * 주식 업데이트가 필요한지 판단
   */
  shouldUpdateStock(existingStock: Stock, newData: CreateStockDto): boolean {
    // 가격 변경이 의미있는 수준인지 확인
    const priceDiff = Math.abs(
      (existingStock.currentPrice = newData.currentPrice),
    );
    const priceChanged = priceDiff >= this.PRICE_UPDATE_THRESHOLD;

    // 회사 정보 변경 확인
    const companyInfoChanged =
      existingStock.companyName !== newData.companyName ||
      existingStock.sector !== newData.sector ||
      existingStock.industry !== newData.industry;

    return priceChanged || companyInfoChanged;
  }

  /**
   * 주식 데이터 준비
   */
  prepareStockData(stockInfo: StockInfo, companyOverview: CompanyOverview) {
    return {
      symbol: stockInfo.symbol,
      companyName: stockInfo.companyName,
      sector: companyOverview?.sector,
      industry: companyOverview?.industry,
      currentPrice: this.validateAndRoundPrice(stockInfo.currentPrice),
      dividendYield: stockInfo.dividendYield,
      dividendRate: stockInfo.dividendRate,
      currency: stockInfo.currency || 'USD',
    };
  }
}
