import { Module } from '@nestjs/common';
import { ServiceShippingService } from './service-shipping.service';
import { ServiceShippingController } from './service-shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceShippingRepository } from './service-shipping.repository';

@Module({
  controllers: [ServiceShippingController],
  providers: [ServiceShippingService],
  imports: [TypeOrmModule.forFeature([ServiceShippingRepository])],
  exports: [ServiceShippingModule, ServiceShippingService],
})
export class ServiceShippingModule {}
