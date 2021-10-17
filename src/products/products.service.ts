import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionsService } from 'src/addresses/modules/regions/regions.service';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly regionsService: RegionsService,
  ) {}

  async getAll() {
    return this.productRepository.find();
  }

  async getProviderProducts(provider: Provider) {
    return this.productRepository.getProviderProducts(provider);
  }

  async getProductsByRegion(id: string) {
    const region = await this.regionsService.findOne(id);
    return this.productRepository.getProductsByRegion(region);
  }

  async getProductsBySecondAddress(name: string) {
    return this.productRepository.getProductsBySecondAddress(name);
  }

  async create(
    createProductDto: CreateProductDto,
    provider: Provider,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, provider);
  }
}
