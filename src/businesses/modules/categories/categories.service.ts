import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './categories.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryRepository.findByName(name);
  }

  async create(name: string): Promise<Category> {
    return this.categoryRepository.createCategory(name);
  }
}
