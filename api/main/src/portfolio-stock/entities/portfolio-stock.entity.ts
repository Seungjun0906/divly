import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolio_stock')
export class PortfolioStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioStocks)
  portfolio: Portfolio;

  @ManyToOne(() => Stock, (stock) => stock.portfolioStocks)
  stock: Stock;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  average_price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
