import { EntityRepository, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { Region } from './modules/regions/entities/region.entity';
import { RegionsService } from './modules/regions/regions.service';

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {
  constructor(private regionsService: RegionsService) {
    super();
  }

  async creatAddress(
    firstAddress: string,
    secondAddress: string,
    region: Region,
  ): Promise<Address> {
    const address = await this.create({ firstAddress, secondAddress, region });
    await this.save(address);
    return address;
  }

  async getAll(): Promise<Address[]> {
    return await this.find();
  }
}
