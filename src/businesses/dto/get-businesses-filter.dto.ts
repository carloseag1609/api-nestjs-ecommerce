import { IsOptional, IsUUID } from 'class-validator';

export class GetBusinessesFilterDto {
  @IsUUID()
  @IsOptional()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  regionId: string;
}
