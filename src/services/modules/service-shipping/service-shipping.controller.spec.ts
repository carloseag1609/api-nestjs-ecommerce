import { Test, TestingModule } from '@nestjs/testing';
import { ServiceShippingController } from './service-shipping.controller';
import { ServiceShippingService } from './service-shipping.service';

describe('ServiceShippingController', () => {
  let controller: ServiceShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceShippingController],
      providers: [ServiceShippingService],
    }).compile();

    controller = module.get<ServiceShippingController>(ServiceShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
