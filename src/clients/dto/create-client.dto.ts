import { IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  fullname: string;

  @IsString()
  @IsOptional()
  validationImage: string;

  @IsString()
  firstAddress: string;

  @IsString()
  secondAddress: string;

  @IsString()
  regionId: string;
}
