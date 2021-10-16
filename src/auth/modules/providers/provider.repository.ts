import { NotFoundException } from "@nestjs/common";
import { Address } from "src/addresses/entities/address.entity";
import { User } from "src/auth/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { Provider } from "./entities/provider.entity";

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
    const provider = await this.findOne({ user });
    if (!provider) {
      throw new NotFoundException(`User not found`);
    }
    return provider;
  }

  async findAll(): Promise<Provider[]> {
    return await this.find();
  }
}
