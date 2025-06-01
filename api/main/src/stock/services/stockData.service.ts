import { Injectable, Logger } from '@nestjs/common';
import {
  CompanyOverview,
  DividendHistory,
  StockDataProvider,
  StockInfo,
} from '../interfaces/stockDataProvider.interface';
import { YahooFinanceProvider } from '../providers/yahooFinance.provider';

@Injectable()
export class StockDataService implements StockDataProvider {
  private readonly logger = new Logger(StockDataService.name);

  constructor(private readonly yahooFinanceProvider: YahooFinanceProvider) {}

  /**
   * 주식 정보 가져오기
   * @param symbol 주식 심볼
   * @returns 주식 정보
   */
  getStockInfo(symbol: string): Promise<StockInfo> {
    return this.yahooFinanceProvider.getStockInfo(symbol);
  }

  /**
   * 배당 이력 데이터 가져오기
   * @param symbol 주식 심볼
   * @param startDate 시작 날짜 (기본값: 1년 전)
   * @returns 배당 이력 데이터
   */
  getDividendHistory(
    symbol: string,
    startDate?: Date,
  ): Promise<DividendHistory[]> {
    return this.yahooFinanceProvider.getDividendHistory(symbol, startDate);
  }

  /**
   * 회사 개요 데이터 가져오기
   * @param symbol 주식 심볼
   * @returns 회사 개요 데이터
   */
  getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    return this.yahooFinanceProvider.getCompanyOverview(symbol);
  }
}
