import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Product } from 'src/products/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductShipping } from './entities/product-shipping.entity';

@EntityRepository(ProductShipping)
export class ProductShippingRepository extends Repository<ProductShipping> {
  async createProductShipping(
    product: Product,
    region: Region,
    price: number,
  ): Promise<ProductShipping> {
    const productShipping = await this.create({ product, region, price });
    await this.save(productShipping);
    return productShipping;
  }
}
