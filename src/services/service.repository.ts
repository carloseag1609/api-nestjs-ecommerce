import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  async createService(createServiceDto: CreateServiceDto, provider: Provider) {
    const service = await this.create({ ...createServiceDto, provider });
    await this.save(service);
    return service;
  }

  async getServicesByRegion(region: Region) {
    return await this.createQueryBuilder('service')
      .leftJoinAndSelect('service.provider', 'provider')
      .leftJoinAndSelect('provider.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('region.id = :id', { id: region.id })
      .getMany();
  }

  async getServicesBySecondAddress(secondAddress: string) {
    return await this.createQueryBuilder('service')
      .leftJoinAndSelect('service.provider', 'provider')
      .leftJoinAndSelect('provider.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('address.secondAddress = :secondAddress', { secondAddress })
      .getMany();
  }
}
