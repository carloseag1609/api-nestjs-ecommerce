import { IsOptional, IsString } from 'class-validator';

export class GetBusinessesFilterDto {
  @IsString()
  @IsOptional()
  category: string;
}
