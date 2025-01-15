import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { TicketType } from '../constants/rental.constant';
import { RentalTicket } from './rental-ticket.entity';

@Entity('ticket_types')
export class TicketTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TicketType,
    comment: '티켓 유형',
  })
  name: TicketType;

  @Column({
    name: 'rental_days',
    type: 'int',
    comment: '대여 기간(일)',
  })
  rentalDays: number;

  @OneToMany(() => RentalTicket, (ticket) => ticket.ticketType)
  tickets: RentalTicket[];
}
