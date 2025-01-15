import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { RentalType } from '../constants/rental.constant';
import { User } from '@/modules/users/entities/user.entity';
import { Episode } from '@/modules/webtoons/entities/episode.entity';
import { RentalTicket } from './rental-ticket.entity';
import { DiamondTransaction } from '@/modules/payments/entities/diamond-transaction.entity';

@Entity('episode_rentals')
export class EpisodeRental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({
    name: 'rental_type',
    type: 'enum',
    enum: RentalType,
    comment: '대여 유형',
  })
  rentalType: RentalType;

  @Column({
    name: 'ticket_id',
    nullable: true,
    comment: '사용된 티켓 ID',
  })
  ticketId: number;

  @Column({
    name: 'diamond_amount',
    type: 'int',
    nullable: true,
    comment: '사용된 다이아 수량',
  })
  diamondAmount: number;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
    comment: '만료일시',
  })
  expiresAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Episode, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @ManyToOne(() => RentalTicket, (ticket) => ticket.rentals, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'ticket_id' })
  ticket: RentalTicket;

  @OneToMany(
    () => DiamondTransaction,
    (transaction) => transaction.episodeRental,
  )
  diamondTransactions: DiamondTransaction[];
}
