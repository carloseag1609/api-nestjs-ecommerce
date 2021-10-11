import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@EntityRepository(Region)
export class RegionsRepository extends Repository<Region> {
  async createRegion(name: string): Promise<Region> {
    const region = this.create({ name });
    try {
      await this.save(region);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(`Region already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
    return region;
  }

  async getAll(): Promise<Region[]> {
    const regions = await this.find();
    return regions;
  }

  async getById(id: string): Promise<Region> {
    const region = await this.findOne(id);
    if (!region) {
      throw new NotFoundException('Region not found');
    }
    return region;
  }
}
