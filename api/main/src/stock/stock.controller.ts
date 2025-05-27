import { Controller, Get, Param } from '@nestjs/common';
import { StockDataService } from './services/stockData.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockDataService: StockDataService) {}

  @Get(':symbol')
  async getStock(@Param('symbol') symbol: string) {
    return await this.stockDataService.getStockInfo(symbol);
  }

  @Get(':symbol/dividend-history')
  async getDividendHistory(@Param('symbol') symbol: string) {
    const startDate = new Date('2020-01-01');
    const history = await this.stockDataService.getDividendHistory(
      symbol,
      startDate,
    );
    return history;
  }
}
