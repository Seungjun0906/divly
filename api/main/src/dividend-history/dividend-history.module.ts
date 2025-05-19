import { Module } from '@nestjs/common';
import { DividendHistoryService } from './dividend-history.service';
import { DividendHistoryController } from './dividend-history.controller';

@Module({
  controllers: [DividendHistoryController],
  providers: [DividendHistoryService],
})
export class DividendHistoryModule {}
