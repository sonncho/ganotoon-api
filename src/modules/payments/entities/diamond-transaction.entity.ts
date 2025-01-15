import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { TransactionType } from '../constants/payment.constant';
import { User } from '@/modules/users/entities/user.entity';
import { DiamondPurchase } from './diamond-purchase.entity';
import { EpisodeRental } from '@/modules/rentals/entities/episode-rental.entity';

@Entity('diamond_transactions')
export class DiamondTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'int',
    comment: '변동 수량 (양수: 충전, 음수: 사용)',
  })
  amount: number;

  @Column({
    type: 'int',
    comment: '변동 후 잔액',
  })
  balance: number;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: TransactionType,
    comment: '거래 유형',
  })
  transactionType: TransactionType;

  @Column({
    name: 'purchase_id',
    nullable: true,
  })
  purchaseId: number;

  @Column({
    name: 'episode_rental_id',
    nullable: true,
  })
  episodeRentalId: number;

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => DiamondPurchase, (purchase) => purchase.transactions, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: DiamondPurchase;

  @ManyToOne(() => EpisodeRental, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'episode_rental_id' })
  episodeRental: EpisodeRental;
}
