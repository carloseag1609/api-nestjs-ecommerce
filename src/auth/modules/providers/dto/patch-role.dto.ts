import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class PatchRoleDto {
  @IsEnum(Role)
  role: Role;
}
