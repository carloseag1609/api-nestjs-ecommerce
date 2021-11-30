import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { RegionsRepository } from 'src/addresses/modules/regions/region.repository';
import { BusinessRepository } from 'src/businesses/business.repository';
import { Business } from 'src/businesses/entities/business.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './entities/shipping.entity';

@EntityRepository(Shipping)
export class ShippingRepository extends Repository<Shipping> {
  async createShipping(
    price: number,
    region: Region,
    business: Business,
  ): Promise<Shipping> {
    const shipping = this.create({
      price,
      business,
      region,
    });
    await this.save(shipping);
    return shipping;
  }
}
