import { Test, TestingModule } from '@nestjs/testing';
import { DividendHistoryController } from './dividend-history.controller';
import { DividendHistoryService } from './dividend-history.service';

describe('DividendHistoryController', () => {
  let controller: DividendHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DividendHistoryController],
      providers: [DividendHistoryService],
    }).compile();

    controller = module.get<DividendHistoryController>(DividendHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
