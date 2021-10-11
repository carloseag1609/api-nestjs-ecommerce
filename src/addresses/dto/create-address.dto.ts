import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  regionId: string;

  @IsString()
  firstAddress: string;

  @IsString()
  secondAddress: string;
}
