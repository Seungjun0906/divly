import { DividendHistory } from 'src/dividend-history/entities/dividend-history.entity';
import { PortfolioStock } from 'src/portfolio-stock/entities/portfolio-stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock')
export class Stock {
  @PrimaryColumn()
  symbol: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ nullable: true })
  industry: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'current_price' })
  currentPrice: number;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    nullable: true,
    name: 'dividend_yield',
  })
  dividendYield: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'dividend_rate',
  })
  dividendRate: number;

  @Column({ type: 'date', nullable: true, name: 'last_dividend_date' })
  lastDividendDate: Date;

  @Column({ type: 'date', nullable: true, name: 'next_dividend_date' })
  nextDividendDate: Date;

  @Column()
  currency: string;

  @OneToMany(() => PortfolioStock, (portfolioStock) => portfolioStock.stock)
  portfolioStocks: PortfolioStock[];

  @OneToMany(() => DividendHistory, (dividendHistory) => dividendHistory.stock)
  dividendHistory: DividendHistory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
