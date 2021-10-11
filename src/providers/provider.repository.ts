import { NotFoundException } from '@nestjs/common';
import { Address } from 'src/addresses/entities/address.entity';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/auth/user.entity';
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
      provider.user.role = Role.PROVIDER;
      await this.save(provider);
      return provider;
    } catch (error) {
      console.log(error);
    }
  }

  async updateRole(id: string, role: Role) {
    const provider = await this.findOne(id);
    if (!provider) {
      throw new NotFoundException(`Provider not found`);
    }
    provider.user.role = role;
    await this.update(provider);
  }
}
