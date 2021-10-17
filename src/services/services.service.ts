import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionsService } from 'src/addresses/modules/regions/regions.service';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    private readonly regionsService: RegionsService,
  ) {}

  async create(createServiceDto: CreateServiceDto, provider: Provider) {
    return this.serviceRepository.createService(createServiceDto, provider);
  }

  async getServicesByRegion(id: string) {
    const region = await this.regionsService.findOne(id);
    return this.serviceRepository.getServicesByRegion(region);
  }

  async getServicesBySecondAddress(name: string) {
    return this.serviceRepository.getServicesBySecondAddress(name);
  }
}
