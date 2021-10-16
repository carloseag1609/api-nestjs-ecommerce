import { Role } from './enums/role.enum';

export interface JwtPayload {
  userId: string;
  clientId?: string | null;
  providerId?: string | null;
  email: string;
  role: Role;
}
