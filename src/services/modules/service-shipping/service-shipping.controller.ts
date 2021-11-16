import { Controller } from '@nestjs/common';
import { ServiceShippingService } from './service-shipping.service';

@Controller('service-shipping')
export class ServiceShippingController {
  constructor(
    private readonly serviceShippingService: ServiceShippingService,
  ) {}
}
