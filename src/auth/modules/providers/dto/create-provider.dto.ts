import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateProviderDto extends CreateUserDto {
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
