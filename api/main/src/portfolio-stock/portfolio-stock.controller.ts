import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioStockService } from './portfolio-stock.service';
import { CreatePortfolioStockDto } from './dto/create-portfolio-stock.dto';
import { UpdatePortfolioStockDto } from './dto/update-portfolio-stock.dto';

@Controller('portfolio-stock')
export class PortfolioStockController {
  constructor(private readonly portfolioStockService: PortfolioStockService) {}

  @Post()
  create(@Body() createPortfolioStockDto: CreatePortfolioStockDto) {
    return this.portfolioStockService.create(createPortfolioStockDto);
  }

  @Get()
  findAll() {
    return this.portfolioStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioStockDto: UpdatePortfolioStockDto) {
    return this.portfolioStockService.update(+id, updatePortfolioStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioStockService.remove(+id);
  }
}
