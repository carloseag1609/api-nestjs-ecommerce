import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ClientRepository } from './modules/clients/client.repository';
import { ProviderRepository } from './modules/providers/provider.repository';
import { Client } from './modules/clients/entities/client.entity';
import { Provider } from './modules/providers/entities/provider.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { Roles } from './roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
    userId: string;
    email: string;
    role: Role;
    client?: Client;
    provider?: Provider;
  }> {
    const { email, password } = authCredentialsDto;
    // check if user exists
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        userId: user.id,
        email,
        role: user.role,
      }; // payload in the token
      const accessToken: string = await this.jwtService.sign(payload);
      if (user.role === 'CLIENT') {
        const client: Client = await this.clientRepository.findByUser(user);
        return {
          accessToken,
          userId: user.id,
          email,
          role: user.role,
          client: client,
          provider: null,
        };
      } else {
        const provider: Provider = await this.providerRepository.findByUser(
          user,
        );
        return {
          accessToken,
          userId: user.id,
          email,
          role: user.role,
          client: null,
          provider,
        };
      }
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async signInAsClient(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ client: Client; accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const client: Client = await this.clientRepository.findByUser(user);
      const payload: JwtPayload = {
        userId: user.id,
        clientId: client.id,
        providerId: null,
        email,
        role: user.role,
      }; // payload in the token
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        client,
        accessToken,
      };
    } else {
      throw new UnauthorizedException(`Please check your login credentials`);
    }
  }

  async signInAsProvider(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ provider: Provider; accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const provider: Provider = await this.providerRepository.findByUser(user);
      const payload: JwtPayload = {
        userId: user.id,
        providerId: provider.id,
        clientId: null,
        email,
        role: user.role,
      }; // payload in the token
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        provider,
        accessToken,
      };
    } else {
      throw new UnauthorizedException(`Please check your login credentials`);
    }
  }

  async getFullUserInfo(user: User): Promise<Client | Provider> {
    if (user.role == Role.PROVIDER) {
      return await this.providerRepository.findByUser(user);
    }
    return await this.clientRepository.findByUser(user);
  }
}
