import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/roles.decorator';
// import { AuthService } from 'src/auth/auth.service';
import { Provider } from './entities/provider.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Controller('auth/providers')
@UseGuards(AuthGuard(), new RoleGuard(new Reflector()))
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @Roles(Role.USER)
  async create(
    @Body() createProviderDto: CreateProviderDto,
    @GetUser() user: User,
  ): Promise<{ provider: Provider; accessToken: string }> {
    const provider = await this.providersService.create(
      createProviderDto,
      user,
    );
    const payload: JwtPayload = { email: user.email, role: provider.user.role }; // new token with the new id
    const accessToken: string = await this.jwtService.sign(payload);
    return {
      provider,
      accessToken,
    };
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }
}
