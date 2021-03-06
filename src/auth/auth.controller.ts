import {
  Body,
  Controller,
  Get,
  Post,
  Provider,
  UseGuards,
} from '@nestjs/common';

// Auth
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

// Custom decorator
import { GetUser } from './get-user.decorator';

// Entities
import { User } from './entities/user.entity';
import { Client } from './modules/clients/entities/client.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Post('/test')
  test(@GetUser() user: User): User {
    console.log(user);
    return user;
  }

  @UseGuards(AuthGuard())
  @Get('/profile')
  profile(@GetUser() user): Provider | Client {
    return user;
  }
}
