import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';

import { Stock } from '../entities/stock.entity';

/**
 * 캐싱 로직
 */
@Injectable()
export class StockCacheService {
  private readonly logger = new Logger(StockCacheService.name);

  /**
   * 1 시간
   */
  private readonly CACHE_TTL_MS = 60 * 60 * 1000;
  /**
   * 24 시간
   */
  private readonly STALE_DATA_TTL_MS = 24 * 60 * 60 * 1000;

  getCacheStatus(stock: Stock): 'fresh' | 'stale' | 'expired' {
    const now = dayjs();
    const timeDiffInMs = now.diff(dayjs(stock.updatedAt));

    if (timeDiffInMs < this.CACHE_TTL_MS) {
      return 'fresh';
    } else if (timeDiffInMs < this.STALE_DATA_TTL_MS) {
      return 'stale';
    } else {
      return 'expired';
    }
  }

  /**
   * stale 데이터 허용 범위 내인지 확인
   */
  isWithinStaleLimit(stock: Stock): boolean {
    return dayjs().diff(dayjs(stock.updatedAt)) < this.STALE_DATA_TTL_MS;
  }

  /**
   * 캐시 TTL을 시장 시간에 따라 조정
   */
  getMarketAwareCacheTTL(): number {
    const now = dayjs().tz('America/New_York');
    const hour = now.hour();

    // 미국 시장 시간 (us time zone 09:30 ~ 16:00)
    if (hour >= 9 && hour < 16) {
      return 5 * 60 * 1000; // 5분 (장중)
    } else {
      return 60 * 60 * 1000; // 1시간 (장외)
    }
  }
}
