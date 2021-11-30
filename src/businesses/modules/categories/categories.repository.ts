import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(name: string): Promise<Category> {
    try {
      const category = this.create({ name });
      await this.save(category);
      return category;
    } catch (error) {
      console.log(error);
      if (error.errcode === 1062) {
        throw new ConflictException(`Category already exists`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.findOne({
      name,
    });
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }
}
