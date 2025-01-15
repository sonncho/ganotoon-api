import { PageRequestDto } from '@/common/dtos/page-request.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserSearchDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(['email', 'nickname', 'createdAt'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
