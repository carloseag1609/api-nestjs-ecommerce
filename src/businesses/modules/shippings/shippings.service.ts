import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionsRepository } from 'src/addresses/modules/regions/region.repository';
import { BusinessRepository } from 'src/businesses/business.repository';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ShippingRepository } from './shipping.repository';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectRepository(ShippingRepository)
    private readonly shippingRepository: ShippingRepository,
    @InjectRepository(BusinessRepository)
    private readonly businessRepository: BusinessRepository,
    @InjectRepository(RegionsRepository)
    private readonly regionsRepository: RegionsRepository,
  ) {}

  async create(createShippingDto: CreateShippingDto) {
    const { price, businessId, regionId } = createShippingDto;
    const business = await this.businessRepository.getBusinessById(businessId);
    const region = await this.regionsRepository.getById(regionId);
    return this.shippingRepository.createShipping(price, region, business);
  }

  findAll() {
    return `This action returns all shippings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipping`;
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return `This action updates a #${id} shipping`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipping`;
  }
}
