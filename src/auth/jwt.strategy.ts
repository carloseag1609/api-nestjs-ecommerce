import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { Client } from './modules/clients/entities/client.entity';
import { Provider } from './modules/providers/entities/provider.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: 'supersuperverysupersecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ email }: JwtPayload): Promise<Client | Provider> {
    const user: User = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const fullAccount: Client | Provider =
      await this.authService.getFullUserInfo(user);
    return fullAccount;
  }

  // async validate(payload: JwtPayload): Promise<User> {
  //   const { email } = payload;
  //   const user: User = await this.usersRepository.findOne({ email });
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
