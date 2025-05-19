import { Module } from '@nestjs/common';
import { PortfolioStockService } from './portfolio-stock.service';
import { PortfolioStockController } from './portfolio-stock.controller';

@Module({
  controllers: [PortfolioStockController],
  providers: [PortfolioStockService],
})
export class PortfolioStockModule {}
