import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Webtoon } from './webtoon.entity';
import { DayOfWeek } from '../constants/webtoon.constant';
@Entity('webtoon_schedules')
export class WebtoonSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'webtoon_id',
  })
  webtoonId: number;

  @Column({
    name: 'day_of_week',
    type: 'enum',
    enum: DayOfWeek,
    comment: '연재 요일',
  })
  dayOfWeek: DayOfWeek;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.schedules)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
