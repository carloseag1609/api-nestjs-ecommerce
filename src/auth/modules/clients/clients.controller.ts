import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { AddressesService } from "src/addresses/addresses.service";
import { Client } from "./entities/client.entity";
import { Role } from "src/auth/enums/role.enum";
import { AuthService } from "src/auth/auth.service";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";

@Controller('/auth/clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly addressesService: AddressesService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<{ client: Client; token: string }> {
    // create new address
    const { firstAddress, secondAddress, regionId } = createClientDto;
    const address = await this.addressesService.create({
      firstAddress,
      secondAddress,
      regionId,
    });

    // create new user
    const { email, password, phone } = createClientDto;
    const user = await this.authService.signUp({
      email,
      password,
      phone,
      role: Role.CLIENT,
    });

    // create new client
    const client = await this.clientsService.create(
      createClientDto,
      user,
      address,
    );

    // signin to generate token and return it
    const { accessToken: token } = await this.authService.signInAsClient({
      email,
      password,
    });

    return {
      client,
      token,
    };
  }

  @Post('/signin')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ client: Client; token: string }> {
    const { accessToken, client } = await this.authService.signInAsClient(
      authCredentialsDto,
    );
    delete client.user.password;
    return {
      token: accessToken,
      client,
    };
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
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
