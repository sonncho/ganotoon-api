import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { PaymentStatus, PaymentMethod } from '../constants/payment.constant';
import { DiamondProduct } from './diamond-product.entity';
import { User } from '@/modules/users/entities/user.entity';
import { DiamondTransaction } from './diamond-transaction.entity';

@Entity('diamond_purchases')
export class DiamondPurchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({
    name: 'payment_amount',
    type: 'int',
    comment: '결제 금액',
  })
  paymentAmount: number;

  @Column({
    name: 'diamond_amount',
    type: 'int',
    comment: '다이아 수량',
  })
  diamondAmount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    comment: '결제 수단',
  })
  paymentMethod: PaymentMethod;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    comment: '결제 상태',
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
    comment: '결제 완료 시간',
  })
  completedAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => DiamondProduct, (product) => product.purchases, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: DiamondProduct;

  @OneToMany(() => DiamondTransaction, (transaction) => transaction.purchase)
  transactions: DiamondTransaction[];
}
