import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: '생성일시',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: '수정일시',
  })
  updatedAt: Date;
}

export abstract class BaseEntityWithDelete extends BaseEntity {
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    comment: '삭제일시',
  })
  deletedAt: Date;
}
