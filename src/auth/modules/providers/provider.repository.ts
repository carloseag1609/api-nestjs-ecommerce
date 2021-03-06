import { NotFoundException } from '@nestjs/common';
import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/auth/entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Provider } from './entities/provider.entity';

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {
  async createProvider(
    createProviderDto: CreateProviderDto,
    user: User,
    address: Address,
  ): Promise<Provider> {
    try {
      const {
        fullname,
        cash,
        card,
        sellProducts,
        offersServices,
        validationImage,
      } = createProviderDto;
      const provider = this.create({
        fullname,
        validationImage,
        cash,
        card,
        sellProducts,
        offersServices,
        validated: false,
        user,
        address,
      });
      await this.save(provider);
      return provider;
    } catch (error) {
      console.log(error);
    }
  }

  async findByUser(user: User): Promise<Provider> {
    const provider = await this.findOne({ user }, { relations: ['business'] });
    if (!provider) {
      throw new NotFoundException(`User not found asdasd`);
    }
    return provider;
  }

  async getProducts(provider: Provider) {}

  async findAll(): Promise<Provider[]> {
    return await this.find();
  }

  async findOneById(id: string) {
    const provider = await this.findOne(id);
    if (!provider) {
      throw new NotFoundException(`Provider not found`);
    }
    return provider;
  }
}
