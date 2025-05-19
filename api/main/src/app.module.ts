import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { StockModule } from './stock/stock.module';
import { PortfolioStockModule } from './portfolio-stock/portfolio-stock.module';
import { DividendHistoryModule } from './dividend-history/dividend-history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import path from 'node:path';
console.log(process.env.DB_HOST);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'prd'
          ? 'configs/.env.prod'
          : 'configs/.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [path.resolve(__dirname, '**/*.entity.{js,ts}')],
      synchronize: true,
    }),
    UserModule,
    PortfolioModule,
    StockModule,
    PortfolioStockModule,
    DividendHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
