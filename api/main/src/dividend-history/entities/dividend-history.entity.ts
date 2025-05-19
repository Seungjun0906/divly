import { Stock } from 'src/stock/entities/stock.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('dividend_history')
export class DividendHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Stock, (stock) => stock.dividendHistory)
  stock: Stock;

  @Column({ type: 'date', name: 'payment_date' })
  paymentDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
