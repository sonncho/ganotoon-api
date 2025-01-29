import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { SortRequestDto } from './sort.dto';

export interface PaginationMeta {
  total: number; // 전체 항목 수
  page: number; // 현재 페이지
  limit: number; // 페이지당 항목 수
  totalPages: number; // 전체 페이지 수
  hasNext: boolean; // 다음 페이지 존재 여부
}

export class PaginationRequestDto extends SortRequestDto {
  @ApiProperty({
    description: '페이지번호',
    required: false,
    default: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: '페이지당 항목 수',
    required: false,
    default: 10,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

export class PaginatedResponseDto<T> {
  items: T[]; // 실제 데이터 배열
  meta: PaginationMeta; // 페이지네이션 메타데이터

  constructor(items: T[], meta: PaginationMeta) {
    this.items = items;
    this.meta = meta;
  }

  static from<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResponseDto<T> {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;

    return new PaginatedResponseDto(items, {
      total,
      page,
      limit,
      totalPages,
      hasNext,
    });
  }
}
