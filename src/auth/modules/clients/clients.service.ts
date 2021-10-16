import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { User } from '../../entities/user.entity';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private readonly clientRepository: ClientRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    createClientDto: CreateClientDto,
    user: User,
    address: Address,
  ): Promise<Client> {
    const { fullname, validationImage } = createClientDto;
    const client = await this.clientRepository.createClient(
      fullname,
      validationImage,
      user,
      address,
    );
    delete client.user.password;
    return client;
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async findByUsert(user: User): Promise<Client> {
    return this.clientRepository.findByUser(user);
  }

  findOne(id: string) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
