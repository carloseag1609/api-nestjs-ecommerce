import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { RegionsRepository } from './region.repository';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionsRepository)
    private regionsRepository: RegionsRepository,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const { name } = createRegionDto;
    return this.regionsRepository.createRegion(name);
  }

  findAll() {
    return this.regionsRepository.getAll();
  }

  findOne(id: string) {
    return this.regionsRepository.findOne(id);
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
