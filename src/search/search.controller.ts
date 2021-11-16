import { Controller, Get, Param } from '@nestjs/common';
import { ProvidersService } from 'src/auth/modules/providers/providers.service';
import { BusinessesService } from 'src/businesses/businesses.service';
import { ProductsService } from 'src/products/products.service';
import { ServicesService } from 'src/services/services.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly servicesService: ServicesService,
    private readonly businessesService: BusinessesService,
    private readonly providersService: ProvidersService,
  ) {}

  @Get('/all')
  async getAll() {
    const products = await this.productsService.getAll();
    const services = await this.servicesService.getAll();
    const providers = await this.providersService.findAll();
    let providersFiltered = [];
    let businesses = await this.businessesService.getAllBusiness();
    providersFiltered = providers.filter((provider) => !provider.business);
    providersFiltered = providersFiltered.map((provider) => {
      const providerProducts = [];
      const providerServices = [];
      const { id } = provider;
      products.forEach((product) => {
        delete product.provider.user.password;
        if (product.provider.id === id) {
          providerProducts.push(product);
        }
      });
      services.forEach((service) => {
        delete service.provider.user.password;
        if (service.provider.id === id) {
          providerServices.push(service);
        }
      });
      delete provider.user.password;
      return {
        ...provider,
        products: providerProducts,
        services: providerServices,
      };
    });
    businesses = businesses.map((business) => {
      const businessProducts = products.filter((product) => {
        if (product.provider && product.provider.id === business.provider.id) {
          delete product.provider;
          return product;
        }
      });
      const businessServices = services.filter((service) => {
        if (service.provider && service.provider.id === business.provider.id) {
          delete service.provider;
          return service;
        }
      });
      delete business.provider.user.password;
      return {
        ...business,
        products: businessProducts,
        services: businessServices,
      };
    });
    businesses.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return {
      businesses,
      providers: providersFiltered,
    };
  }

  @Get('/word/:word')
  async getByWord(@Param('word') word: string) {
    const products = await this.productsService.findByWord(word);
    const services = await this.servicesService.findByWord(word);
    return {
      products,
      services,
    };
  }

  @Get('/business/:businessId')
  async getByBusiness(@Param('businessId') businessId: string) {
    let products = await this.productsService.getAll();
    let services = await this.servicesService.getAll();
    const business = await this.businessesService.findOne(businessId);
    products = products.filter(
      (product) => business.provider.id === product.provider.id,
    );
    services = services.filter(
      (service) => business.provider.id === service.provider.id,
    );
    delete business.provider.user.password;
    return {
      business: {
        ...business,
        products,
        services,
      },
    };
  }

  @Get('/provider/:providerId')
  async getByProvider(@Param('providerId') providerId: string) {
    let products = await this.productsService.getAll();
    let services = await this.servicesService.getAll();
    const provider = await this.providersService.findOne(providerId);
    products = products.filter(
      (product) => provider.id === product.provider.id,
    );
    services = services.filter(
      (service) => provider.id === service.provider.id,
    );
    delete provider.user.password;
    return {
      provider: {
        ...provider,
        products,
        services,
      },
    };
  }

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
