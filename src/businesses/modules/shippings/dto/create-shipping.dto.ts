import { IsNumber, IsUUID } from 'class-validator';

export class CreateShippingDto {
  @IsUUID()
  regionId: string;

  @IsUUID()
  businessId: string;

  @IsNumber()
  price: number;
}
