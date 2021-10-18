import { Module } from '@nestjs/common';
import { ProductsShippingService } from './products-shipping.service';
import { ProductsShippingController } from './products-shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductShippingRepository } from './product-shipping.repository';

@Module({
  controllers: [ProductsShippingController],
  providers: [ProductsShippingService],
  imports: [TypeOrmModule.forFeature([ProductShippingRepository])],
  exports: [ProductsShippingModule, ProductsShippingService],
})
export class ProductsShippingModule {}
