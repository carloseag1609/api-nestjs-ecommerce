import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/auth/user.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { ProviderRepository } from './provider.repository';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderRepository)
    private readonly providerRepository: ProviderRepository,
    private readonly addressesService: AddressesService,
  ) {}

  async create(
    createProviderDto: CreateProviderDto,
    user: User,
  ): Promise<Provider> {
    const foundProvider = await this.providerRepository.findOne({
      user: { id: user.id },
    });

    if (foundProvider) {
      throw new ConflictException(`You're already a provider`);
    }

    const { firstAddress, secondAddress, regionId } = createProviderDto;
    const address = await this.addressesService.create({
      firstAddress,
      secondAddress,
      regionId,
    });
    const provider = await this.providerRepository.createProvider(
      createProviderDto,
      user,
      address,
    );
    return provider;
  }

  findAll() {
    return `This action returns all providers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  async updateRole(id: string, newRole: Role) {}

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
