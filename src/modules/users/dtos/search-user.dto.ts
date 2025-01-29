import { PaginationRequestDto } from '@/common/dtos';
import { IsOptional, IsString } from 'class-validator';

export class UserSearchDto extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
