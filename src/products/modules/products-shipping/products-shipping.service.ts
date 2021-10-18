import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductShipping } from './entities/product-shipping.entity';
import { ProductShippingRepository } from './product-shipping.repository';

@Injectable()
export class ProductsShippingService {
  constructor(
    @InjectRepository(ProductShippingRepository)
    private readonly productShippingRepository: ProductShippingRepository,
  ) {}

  async create(
    product: Product,
    region: Region,
    price: number,
  ): Promise<ProductShipping> {
    return await this.productShippingRepository.createProductShipping(
      product,
      region,
      price,
    );
  }
}
