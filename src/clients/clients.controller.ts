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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { Client } from './entities/client.entity';
import { Role } from 'src/auth/enums/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('/auth/clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly addressesService: AddressesService,
  ) {}

  @Post('/signup')
  @Roles(Role.USER)
  @UseGuards(AuthGuard(), new RoleGuard(new Reflector()))
  async create(
    @Body() createClientDto: CreateClientDto,
    @GetUser() user: User,
  ): Promise<Client> {
    // destructuring the properties to create a new address
    const { firstAddress, secondAddress, regionId } = createClientDto;
    // create the new client's address
    const address = await this.addressesService.create({
      firstAddress,
      secondAddress,
      regionId,
    });
    return this.clientsService.create(createClientDto, user, address);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), new RoleGuard(new Reflector()))
  findAll() {
    return this.addressesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
