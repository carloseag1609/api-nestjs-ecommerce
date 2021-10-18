import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Roles } from 'src/auth/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { SetShippingPriceDto } from './dto/set-shipping-price.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }

  @Get('/region/:id')
  getProductsByRegion(@Param('id') id: string) {
    return this.productsService.getProductsByRegion(id);
  }

  @Get('/secondAddress/:name')
  getProductsBySecondAddress(@Param('name') name: string) {
    return this.productsService.getProductsBySecondAddress(name);
  }

  @Roles(Role.PROVIDER)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() provider: Provider,
  ) {
    return this.productsService.create(createProductDto, provider);
  }

  @Post('/shipping/:productId')
  setShippingPrice(
    @Param('productId') productId: string,
    @Body() setShippingPriceDto: SetShippingPriceDto,
  ) {
    const { price, regionId } = setShippingPriceDto;
    return this.productsService.setShippingPrice(productId, regionId, price);
  }
}
