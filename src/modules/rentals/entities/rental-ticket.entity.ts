import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Webtoon } from '@/modules/webtoons/entities/webtoon.entity';
import { TicketTypeEntity } from './ticket-type.entity';
import { EpisodeRental } from './episode-rental.entity';

@Entity('rental_tickets')
export class RentalTicket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'ticket_type_id' })
  ticketTypeId: number;

  @Column({
    name: 'webtoon_id',
    nullable: true,
    comment: 'NULL이면 전체 작품 사용 가능',
  })
  webtoonId: number;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
    comment: '만료일시',
  })
  expiresAt: Date;

  @Column({
    name: 'used_at',
    type: 'timestamp',
    nullable: true,
    comment: '사용일시',
  })
  usedAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TicketTypeEntity, (ticketType) => ticketType.tickets, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'ticket_type_id' })
  ticketType: TicketTypeEntity;

  @ManyToOne(() => Webtoon, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @OneToMany(() => EpisodeRental, (rental) => rental.ticket)
  rentals: EpisodeRental[];
}
