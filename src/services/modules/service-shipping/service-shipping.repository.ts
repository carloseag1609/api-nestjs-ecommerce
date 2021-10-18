import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Service } from 'src/services/entities/service.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ServiceShipping } from './entities/service-shipping.entity';

@EntityRepository(ServiceShipping)
export class ServiceShippingRepository extends Repository<ServiceShipping> {
  async createServiceShipping(
    service: Service,
    region: Region,
    price: number,
  ): Promise<ServiceShipping> {
    const shipping = await this.create({
      service,
      region,
      price,
    });
    await this.save(shipping);
    return shipping;
  }
}
