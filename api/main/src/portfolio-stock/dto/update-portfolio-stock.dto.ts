import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioStockDto } from './create-portfolio-stock.dto';

export class UpdatePortfolioStockDto extends PartialType(CreatePortfolioStockDto) {}
