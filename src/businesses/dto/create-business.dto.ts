import { IsString, IsUUID } from 'class-validator';

export class CreateBusinessDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsString()
  envioColima: string;

  @IsString()
  envioVdeA: string;
}
