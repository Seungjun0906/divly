import { Test, TestingModule } from '@nestjs/testing';
import { DividendHistoryService } from './dividend-history.service';

describe('DividendHistoryService', () => {
  let service: DividendHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DividendHistoryService],
    }).compile();

    service = module.get<DividendHistoryService>(DividendHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
