import { PortfolioStock } from 'src/portfolio-stock/entities/portfolio-stock.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid', { name: 'portfolio_id' })
  portfolioId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(() => PortfolioStock, (portfolioStock) => portfolioStock.portfolio)
  portfolioStocks: PortfolioStock[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
