import { ConflictException, NotFoundException } from '@nestjs/common';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { EntityRepository, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    provider: Provider,
  ): Promise<Product> {
    try {
      const product = await this.create({
        ...createProductDto,
        provider,
      });
      await this.save(product);
      return product;
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.sqlMessage);
    }
  }

  async updateProduct(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.thumbnail = createProductDto.thumbnail;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    await this.save(product);
    return await this.getProductById(id);
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

  async getProductById(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  async findByWord(word: string): Promise<Product[]> {
    const products = await this.find({
      where: [{ name: Like(`${word}%`) }, { description: Like(`${word}%`) }],
    });
    return products;
  }
}
