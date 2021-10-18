import { IsNumber, IsUUID } from 'class-validator';

export class SetShippingPriceDto {
  @IsUUID()
  regionId: string;

  @IsNumber()
  price: number;
}
