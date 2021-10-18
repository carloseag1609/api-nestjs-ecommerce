import { Test, TestingModule } from '@nestjs/testing';
import { ProductsShippingController } from './products-shipping.controller';
import { ProductsShippingService } from './products-shipping.service';

describe('ProductsShippingController', () => {
  let controller: ProductsShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsShippingController],
      providers: [ProductsShippingService],
    }).compile();

    controller = module.get<ProductsShippingController>(ProductsShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
