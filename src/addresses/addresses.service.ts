import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesRepository } from './addresess.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { RegionsService } from './modules/regions/regions.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesRepository)
    private addressesRepository: AddressesRepository,
    private regionsService: RegionsService,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { firstAddress, secondAddress, regionId } = createAddressDto;
    const region = await this.regionsService.findOne(regionId);
    return this.addressesRepository.creatAddress(
      firstAddress,
      secondAddress,
      region,
    );
  }

  findAll() {
    return this.addressesRepository.getAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
