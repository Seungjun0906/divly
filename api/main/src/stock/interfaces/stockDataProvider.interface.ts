export interface StockDataProvider {
  getStockInfo(symbol: string): Promise<StockInfo>;
  getDividendHistory(
    symbol: string,
    startDate?: Date,
  ): Promise<DividendHistory[]>;
  getCompanyOverview(symbol: string): Promise<CompanyOverview>;
}

export interface StockInfo {
  symbol: string;
  companyName: string;
  currentPrice: number;
  currency: string;
  dividendRate?: number;
  dividendYield?: number;
}

export interface DividendHistory {
  symbol: string;
  paymentDate: Date;
  amount: number;
  currency: string;
}

export interface CompanyOverview {
  symbol: string;
  sector?: string;
  industry?: string;
  description?: string;
  website?: string;
}
