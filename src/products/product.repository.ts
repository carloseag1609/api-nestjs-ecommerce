import { ConflictException } from '@nestjs/common';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    provider: Provider,
  ): Promise<Product> {
    try {
      const product = await this.create({ ...createProductDto, provider });
      await this.save(product);
      return product;
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }

  async getProviderProducts(provider: Provider): Promise<Product[]> {
    const products = await this.find({
      where: {
        provider,
      },
    });
    return products;
  }

  async getProductsByRegion(region: Region) {
    return await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.provider', 'provider')
      .leftJoinAndSelect('provider.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('region.id = :id', { id: region.id })
      .getMany();
  }

  async getProductsBySecondAddress(secondAddress: string) {
    return await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.provider', 'provider')
      .leftJoinAndSelect('provider.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('address.secondAddress = :secondAddress', { secondAddress })
      .getMany();
  }
}
