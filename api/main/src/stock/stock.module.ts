import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { DividendHistory } from 'src/dividend-history/entities/dividend-history.entity';
import { ConfigModule } from '@nestjs/config';
import { YahooFinanceProvider } from './providers/yahooFinance.provider';
import { StockDataService } from './services/stockData.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, DividendHistory]), ConfigModule],
  controllers: [StockController],
  providers: [StockDataService, YahooFinanceProvider],
})
export class StockModule {}
