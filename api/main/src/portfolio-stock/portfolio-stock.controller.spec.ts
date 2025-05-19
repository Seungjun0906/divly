import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioStockController } from './portfolio-stock.controller';
import { PortfolioStockService } from './portfolio-stock.service';

describe('PortfolioStockController', () => {
  let controller: PortfolioStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioStockController],
      providers: [PortfolioStockService],
    }).compile();

    controller = module.get<PortfolioStockController>(PortfolioStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
