import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ServicesService } from 'src/services/services.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly productsService: ProductsService,
    private readonly servicesService: ServicesService,
  ) {}

  @Get('/region/:id')
  async getProductsByRegion(@Param('id') id: string) {
    const products = await this.productsService.getProductsByRegion(id);
    const services = await this.servicesService.getServicesByRegion(id);
    return {
      services,
      products,
    };
  }

  @Get('/secondAddress/:name')
  async getProductsBySecondAddress(@Param('name') name: string) {
    const products = await this.productsService.getProductsBySecondAddress(
      name,
    );
    const services = await this.servicesService.getServicesBySecondAddress(
      name,
    );
    return {
      services,
      products,
    };
  }
}
