import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { User } from '../auth/user.entity';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  create(createClientDto: CreateClientDto, user: User, address: Address) {
    const { fullname, validationImage } = createClientDto;
    return this.clientsRepository.createClient(
      fullname,
      validationImage,
      user,
      address,
    );
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.findAll();
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
