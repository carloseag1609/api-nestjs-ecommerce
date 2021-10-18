import { Test, TestingModule } from '@nestjs/testing';
import { ServiceShippingService } from './service-shipping.service';

describe('ServiceShippingService', () => {
  let service: ServiceShippingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceShippingService],
    }).compile();

    service = module.get<ServiceShippingService>(ServiceShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
