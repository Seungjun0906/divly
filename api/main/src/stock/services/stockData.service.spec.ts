import { Test, TestingModule } from '@nestjs/testing';
import {
  CompanyOverview,
  DividendHistory,
  StockInfo,
} from '../interfaces/stockDataProvider.interface';
import { YahooFinanceProvider } from '../providers/yahooFinance.provider';
import { StockDataService } from './stockData.service';

describe('StockDataService', () => {
  let service: StockDataService;
  let yahooProvider: YahooFinanceProvider;

  // Mock 데이터 정의
  const mockStockInfo: StockInfo = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 150.75,
    currency: 'USD',
    dividendYield: 0.02,
    dividendRate: 0.0061,
  };

  const mockDividendHistory: DividendHistory[] = [
    {
      symbol: 'AAPL',
      paymentDate: new Date('2023-11-16'),
      amount: 0.23,
      currency: 'USD',
    },
    {
      symbol: 'AAPL',
      paymentDate: new Date('2023-08-11'),
      amount: 0.24,
      currency: 'USD',
    },
  ];

  const mockCompanyOverview: CompanyOverview = {
    symbol: 'AAPL',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description: 'Apple Inc. designs, manufactures, and markets smartphones...',
    website: 'https://www.apple.com',
  };

  // Mock Provider 생성
  const mockYahooProvider = {
    getStockInfo: jest.fn(),
    getDividendHistory: jest.fn(),
    getCompanyOverview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockDataService,
        {
          provide: YahooFinanceProvider,
          useValue: mockYahooProvider,
        },
      ],
    }).compile();

    service = module.get<StockDataService>(StockDataService);
    yahooProvider = module.get<YahooFinanceProvider>(YahooFinanceProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStockInfo', () => {
    it('should return stock information when valid symbol provided', async () => {
      // Arrange: Mock 설정
      mockYahooProvider.getStockInfo.mockResolvedValue(mockStockInfo);

      // Act: 메서드 실행
      const result = await service.getStockInfo('AAPL');

      // Assert: 결과 검증
      expect(yahooProvider.getStockInfo).toHaveBeenCalledWith('AAPL');
      expect(yahooProvider.getStockInfo).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStockInfo);
      expect(result.symbol).toBe('AAPL');
      expect(result.currentPrice).toBeGreaterThan(0);
    });

    it('should return dividend history without start date', async () => {
      // Arrange
      mockYahooProvider.getDividendHistory.mockResolvedValue(
        mockDividendHistory,
      );

      // Act
      const result = await service.getDividendHistory('AAPL');

      // Assert
      expect(yahooProvider.getDividendHistory).toHaveBeenCalledWith(
        'AAPL',
        undefined,
      );
      expect(result).toEqual(mockDividendHistory);
    });

    it('should return empty array for stock with no dividends', async () => {
      // Arrange
      mockYahooProvider.getDividendHistory.mockResolvedValue([]);

      // Act
      const result = await service.getDividendHistory('TSLA');

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getCompanyOverview', () => {
    it('should return company overview', async () => {
      // Arrange
      mockYahooProvider.getCompanyOverview.mockResolvedValue(
        mockCompanyOverview,
      );

      // Act
      const result = await service.getCompanyOverview('AAPL');

      // Assert
      expect(yahooProvider.getCompanyOverview).toHaveBeenCalledWith('AAPL');
      expect(result).toEqual(mockCompanyOverview);
      expect(result.symbol).toBe('AAPL');
      expect(result.sector).toBeDefined();
    });

    it('should handle API error gracefully', async () => {
      // Arrange
      mockYahooProvider.getCompanyOverview.mockRejectedValue(
        new Error('Company not found'),
      );

      // Act & Assert
      await expect(service.getCompanyOverview('INVALID')).rejects.toThrow(
        'Company not found',
      );
    });
  });
});
