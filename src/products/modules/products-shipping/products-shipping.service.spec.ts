import { Test, TestingModule } from '@nestjs/testing';
import { ProductsShippingService } from './products-shipping.service';

describe('ProductsShippingService', () => {
  let service: ProductsShippingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsShippingService],
    }).compile();

    service = module.get<ProductsShippingService>(ProductsShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
