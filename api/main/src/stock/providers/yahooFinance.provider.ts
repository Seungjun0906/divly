import { Injectable, Logger } from '@nestjs/common';
import yf from 'yahoo-finance2';

import type {
  CompanyOverview,
  DividendHistory,
  StockDataProvider,
  StockInfo,
} from '../interfaces/stockDataProvider.interface';

import dayjs from 'dayjs';

@Injectable()
export class YahooFinanceProvider implements StockDataProvider {
  private readonly logger = new Logger(YahooFinanceProvider.name);

  async getStockInfo(symbol: string): Promise<StockInfo> {
    try {
      const quote = await yf.quote(symbol);
      console.log('====================================');
      console.log(quote);
      console.log('====================================');

      return {
        symbol: quote.symbol,
        companyName: quote.longName,
        currentPrice: quote.regularMarketPrice,
        currency: quote.currency,
        dividendRate: quote.trailingAnnualDividendRate,
        dividendYield: quote.trailingAnnualDividendYield,
      };
    } catch (err) {
      this.logger.error(`${symbol} 데이터를 가져오는데 실패했습니다.`, err);
      throw err;
    }
  }

  async getDividendHistory(
    symbol: string,
    startDate?: Date,
  ): Promise<DividendHistory[]> {
    try {
      const formattedStartDate = startDate
        ? dayjs(startDate).format('YYYY-MM-DD')
        : undefined;

      const result = await yf.historical(symbol, {
        period1: formattedStartDate,
        events: 'dividends',
      });

      return result.map((row) => ({
        symbol,
        paymentDate: dayjs(row.date).toDate(),
        amount: row.dividends,
        currency: '',
      }));
    } catch (err) {
      this.logger.error(`${symbol} 배당 내역을 가져오는데 실패했습니다.`, err);
      throw err;
    }
  }

  async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    try {
      const result = await yf.quoteSummary(symbol, {
        modules: ['assetProfile'],
      });
      const profile = result.assetProfile;

      return {
        symbol,
        sector: profile.sector,
        industry: profile.industry,
        description: profile.longBusinessSummary,
        website: profile.website,
      };
    } catch (error) {
      this.logger.error(
        `${symbol} 회사 개요를 가져오는데 실패했습니다.`,
        error,
      );
      throw error;
    }
  }
}
