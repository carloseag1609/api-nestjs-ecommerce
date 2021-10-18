import { Controller } from '@nestjs/common';
import { ProductsShippingService } from './products-shipping.service';

@Controller('products-shipping')
export class ProductsShippingController {
  constructor(private readonly productsShippingService: ProductsShippingService) {}
}
