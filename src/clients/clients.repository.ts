import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { Client } from './entities/client.entity';
import { User } from '../auth/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@EntityRepository(Client)
export class ClientsRepository extends Repository<Client> {
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
      client.user.role = Role.CLIENT;
      await this.save(client);
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Client[]> {
    return this.find();
  }
}
