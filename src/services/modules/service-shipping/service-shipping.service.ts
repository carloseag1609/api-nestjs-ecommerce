import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Service } from 'src/services/entities/service.entity';
import { ServiceShipping } from './entities/service-shipping.entity';
import { ServiceShippingRepository } from './service-shipping.repository';

@Injectable()
export class ServiceShippingService {
  constructor(
    @InjectRepository(ServiceShippingRepository)
    private readonly serviceShippingRepository: ServiceShippingRepository,
  ) {}

  async create(
    service: Service,
    region: Region,
    price: number,
  ): Promise<ServiceShipping> {
    const shipping = await this.serviceShippingRepository.createServiceShipping(
      service,
      region,
      price,
    );
    return shipping;
  }
}
