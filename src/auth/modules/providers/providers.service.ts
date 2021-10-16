import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { Provider } from "./entities/provider.entity";
import { ProviderRepository } from "./provider.repository";
import { Address } from "src/addresses/entities/address.entity";
import { UsersRepository } from "src/auth/users.repository";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderRepository)
    private readonly providerRepository: ProviderRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    createProviderDto: CreateProviderDto,
    user: User,
    address: Address,
  ): Promise<Provider> {
    const provider = await this.providerRepository.createProvider(
      createProviderDto,
      user,
      address,
    );
    delete provider.user.password;
    return provider;
  }

  findAll() {
    return this.providerRepository.findOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
