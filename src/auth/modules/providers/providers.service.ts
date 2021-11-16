import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { ProviderRepository } from './provider.repository';
import { Address } from 'src/addresses/entities/address.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderRepository)
    private readonly providerRepository: ProviderRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly productsService: ProductsService,
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

  async getProviderProducts(provider: Provider) {
    return this.productsService.getProviderProducts(provider);
  }

  async findAll() {
    let providers = await this.providerRepository.find({
      relations: ['business'],
    });
    providers = providers.map((provider) => {
      provider.business && delete provider.business.provider.user.password;
      return provider;
    });
    return providers;
  }

  findOne(id: string) {
    return this.providerRepository.findOneById(id);
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: string) {
    return `This action removes a #${id} provider`;
  }
}
