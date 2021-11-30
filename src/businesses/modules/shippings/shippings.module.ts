import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingRepository } from './shipping.repository';
import { BusinessRepository } from 'src/businesses/business.repository';
import { RegionsRepository } from 'src/addresses/modules/regions/region.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShippingRepository,
      BusinessRepository,
      RegionsRepository,
    ]),
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule {}
