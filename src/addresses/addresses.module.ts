import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { RegionsModule } from './modules/regions/regions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from './addresess.repository';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [RegionsModule, TypeOrmModule.forFeature([AddressesRepository])],
  exports: [AddressesService],
})
export class AddressesModule {}
