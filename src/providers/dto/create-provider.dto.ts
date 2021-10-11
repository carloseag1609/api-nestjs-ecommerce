import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  fullname: string;

  @IsBoolean()
  cash: boolean;

  @IsBoolean()
  card: boolean;

  @IsBoolean()
  sellProducts: boolean;

  @IsBoolean()
  offersServices: boolean;

  @IsOptional()
  @IsString()
  validationImage: string;

  @IsString()
  firstAddress: string;

  @IsString()
  secondAddress: string;

  @IsString()
  regionId: string;
}
