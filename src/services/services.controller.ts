import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Roles } from 'src/auth/roles.decorator';
import { SetShippingPriceDto } from 'src/products/dto/set-shipping-price.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Roles(Role.PROVIDER)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Post()
  create(
    @Body() createServiceDto: CreateServiceDto,
    @GetUser() provider: Provider,
  ) {
    return this.servicesService.create(createServiceDto, provider);
  }

  @Get('/region/:id')
  getProductsByRegion(@Param('id') id: string) {
    return this.servicesService.getServicesByRegion(id);
  }

  @Get('/secondAddress/:name')
  getProductsBySecondAddress(@Param('name') name: string) {
    return this.servicesService.getServicesBySecondAddress(name);
  }

  @Post('/shipping/:serviceId')
  setShippingPrice(
    @Param('serviceId') serviceId: string,
    @Body() setShippingPriceDto: SetShippingPriceDto,
  ) {
    const { price, regionId } = setShippingPriceDto;
    return this.servicesService.setShippingPrice(serviceId, regionId, price);
  }
}
