import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PageRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  size?: number = 20;

  get skip(): number {
    return (this.page - 1) * this.size;
  }
}
