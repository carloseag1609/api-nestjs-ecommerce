import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;
}
