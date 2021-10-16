import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
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
