import { Injectable } from '@nestjs/common';
import { CreatePortfolioStockDto } from './dto/create-portfolio-stock.dto';
import { UpdatePortfolioStockDto } from './dto/update-portfolio-stock.dto';

@Injectable()
export class PortfolioStockService {
  create(createPortfolioStockDto: CreatePortfolioStockDto) {
    return 'This action adds a new portfolioStock';
  }

  findAll() {
    return `This action returns all portfolioStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolioStock`;
  }

  update(id: number, updatePortfolioStockDto: UpdatePortfolioStockDto) {
    return `This action updates a #${id} portfolioStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolioStock`;
  }
}
