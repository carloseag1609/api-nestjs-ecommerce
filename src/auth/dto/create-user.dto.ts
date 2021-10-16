import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { Role } from '../enums/role.enum';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
