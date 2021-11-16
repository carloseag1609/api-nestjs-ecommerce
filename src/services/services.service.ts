import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionsService } from 'src/addresses/modules/regions/regions.service';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';
import { ServiceShippingService } from './modules/service-shipping/service-shipping.service';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    private readonly regionsService: RegionsService,
    private readonly serviceShippingService: ServiceShippingService,
  ) {}

  async create(createServiceDto: CreateServiceDto, provider: Provider) {
    return this.serviceRepository.createService(createServiceDto, provider);
  }

  async getAll() {
    return this.serviceRepository.find();
  }

  async getServicesByRegion(id: string) {
    const region = await this.regionsService.findOne(id);
    return this.serviceRepository.getServicesByRegion(region);
  }

  async getServicesBySecondAddress(name: string) {
    return this.serviceRepository.getServicesBySecondAddress(name);
  }

  async setShippingPrice(serviceId: string, regionId: string, price: number) {
    const service = await this.serviceRepository.getServiceById(serviceId);
    const region = await this.regionsService.findOne(regionId);
    const serviceHasShippingPrice = service.shippings.find(
      (shipping) => shipping.region.id === region.id,
    );
    if (!serviceHasShippingPrice) {
      const shippingPrice = await this.serviceShippingService.create(
        service,
        region,
        price,
      );
      service.shippings.push(shippingPrice);
      await this.serviceRepository.save(service);
      return shippingPrice;
    } else {
      throw new ConflictException(
        `This service already has a shipping price for that region`,
      );
    }
  }

  async findByWord(word: string): Promise<Service[]> {
    return this.serviceRepository.findByWord(word);
  }
}
