import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { RegionsService } from 'src/addresses/modules/regions/regions.service';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { BusinessesService } from 'src/businesses/businesses.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SetShippingPriceDto } from './dto/set-shipping-price.dto';
import { Product } from './entities/product.entity';
import { ProductsShippingService } from './modules/products-shipping/products-shipping.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly regionsService: RegionsService,
    private readonly productsShippingService: ProductsShippingService,
    private readonly businessesService: BusinessesService,
  ) {}

  async getAll() {
    return this.productRepository.find();
  }

  async findByWord(word: string): Promise<Product[]> {
    return this.productRepository.findByWord(word);
  }

  async getById(id: string) {
    return this.productRepository.getProductById(id);
  }

  async deleteById(id: string) {
    return await this.productRepository.delete({
      id,
    });
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
    const product = await this.productRepository.createProduct(
      createProductDto,
      provider,
    );
    // await this.businessesService.addProduct(provider.business.id, product);
    return product;
  }

  async update(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.updateProduct(
      id,
      createProductDto,
    );
    return product;
  }

  async setShippingPrice(productId: string, regionId: string, price: number) {
    const product = await this.productRepository.getProductById(productId);
    const region = await this.regionsService.findOne(regionId);
    const productHasShippingPrice = product.shippings.find(
      (shipping) => shipping.region.id === region.id,
    );
    if (!productHasShippingPrice) {
      const shippingPrice = await this.productsShippingService.create(
        product,
        region,
        price,
      );
      product.shippings.push(shippingPrice);
      await this.productRepository.save(product);
    } else {
      throw new ConflictException(
        `This product already has a shipping price for that region`,
      );
    }
  }
}
