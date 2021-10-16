import { Controller, Get, Post, UseGuards } from '@nestjs/common';

// Auth
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

// Custom decorator
import { GetUser } from './get-user.decorator';

// Entities
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signup')
  // signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }

  // @Post('/signin')
  // signIn(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }

  @Get()
  async index(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User): User {
    console.log(user);
    return user;
  }

  @Get('/profile')
  profile(@GetUser() user: User): User {
    return user;
  }
}
