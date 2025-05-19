import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioStockService } from './portfolio-stock.service';

describe('PortfolioStockService', () => {
  let service: PortfolioStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioStockService],
    }).compile();

    service = module.get<PortfolioStockService>(PortfolioStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
