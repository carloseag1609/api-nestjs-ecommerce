import { EntityRepository, Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Business } from './entities/business.entity';
import { Category } from './modules/categories/entities/category.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './modules/categories/categories.repository';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Product } from 'src/products/entities/product.entity';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  async createBusiness(
    createBusinessDto: CreateBusinessDto,
    provider: Provider,
    category: Category,
  ): Promise<Business> {
    try {
      const business = this.create({
        ...createBusinessDto,
        provider,
        category,
      });
      await this.save(business);
      return business;
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }

  async getBusinessById(id: string): Promise<Business> {
    const business = await this.findOne(id);
    if (!business) {
      throw new NotFoundException(`Business not found`);
    }
    return business;
  }

  async getBusinessesByCategory(category: Category): Promise<Business[]> {
    const businesses = await this.find({
      category: {
        id: category.id,
      },
    });
    return businesses;
  }

  async getBusinessByCategory(category: Category): Promise<Business[]> {
    const businesses = await this.find({
      where: {
        category,
      },
    });
    return businesses;
  }

  // async addProduct(businessId: string, product: Product) {
  //   const business = await this.getBusinessById(businessId);
  //   console.log(business);
  //   console.log(product);
  //   business.products.push(product);
  //   await this.save(business);
  // }
}
