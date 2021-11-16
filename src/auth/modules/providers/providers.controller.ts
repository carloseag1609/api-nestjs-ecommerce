import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { AuthService } from 'src/auth/auth.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { Provider } from './entities/provider.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('auth/providers')
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService,
    private readonly authService: AuthService,
    private readonly addressesService: AddressesService,
  ) {}

  @Post('/signup')
  async create(
    @Body() createProviderDto: CreateProviderDto,
  ): Promise<{ provider: Provider; token: string }> {
    // create new address
    const { firstAddress, secondAddress, regionId } = createProviderDto;
    const address = await this.addressesService.create({
      firstAddress,
      secondAddress,
      regionId,
    });

    // create new user
    const { email, password, phone } = createProviderDto;
    const user = await this.authService.signUp({
      email,
      password,
      phone,
      role: Role.PROVIDER,
    });

    // create new provider
    const provider = await this.providersService.create(
      createProviderDto,
      user,
      address,
    );

    // signin to generate token and return it
    const { accessToken: token } = await this.authService.signInAsProvider({
      email,
      password,
    });

    return {
      token,
      provider,
    };
  }

  @Post('/signin')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ provider: Provider; token: string }> {
    const { accessToken, provider } = await this.authService.signInAsProvider(
      authCredentialsDto,
    );
    delete provider.user.password;
    return {
      token: accessToken,
      provider,
    };
  }

  @Roles(Role.PROVIDER)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Get('/my-products')
  getProducts(@GetUser() provider: Provider) {
    return this.providersService.getProviderProducts(provider);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
