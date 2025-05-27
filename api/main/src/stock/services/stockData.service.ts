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

  getStockInfo(symbol: string): Promise<StockInfo> {
    return this.yahooFinanceProvider.getStockInfo(symbol);
  }

  getDividendHistory(
    symbol: string,
    startDate?: Date,
  ): Promise<DividendHistory[]> {
    return this.yahooFinanceProvider.getDividendHistory(symbol, startDate);
  }

  getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    return this.yahooFinanceProvider.getCompanyOverview(symbol);
  }
}
