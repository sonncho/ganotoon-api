import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiamondProductType } from '../constants/payment.constant';
import { DiamondPurchase } from './diamond-purchase.entity';

@Entity('diamond_products')
export class DiamondProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: DiamondProductType,
    comment: '상품 유형',
  })
  type: DiamondProductType;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '상품명',
  })
  name: string;

  @Column({
    name: 'diamond_amount',
    type: 'int',
    comment: '다이아 개수',
  })
  diamondAmount: number;

  @Column({
    type: 'int',
    comment: '가격(원)',
  })
  price: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '판매 여부',
  })
  isActive: boolean;

  @OneToMany(() => DiamondPurchase, (purchase) => purchase.product)
  purchases: DiamondPurchase[];
}
