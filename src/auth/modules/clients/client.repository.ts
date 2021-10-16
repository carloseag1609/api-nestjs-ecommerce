import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { Client } from './entities/client.entity';
import { User } from '../../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async createClient(
    fullname,
    validationImage,
    user: User,
    address: Address,
  ): Promise<Client> {
    try {
      const client = this.create({
        fullname,
        validationImage,
        validated: false,
        user,
        address,
      });
      await this.save(client);
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Client[]> {
    return this.find();
  }

  async findByUser(user: User): Promise<Client> {
    const client = await this.findOne({ user });
    if (!client) {
      throw new NotFoundException(`User not found`);
    }
    return client;
  }
}
