import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { RegionsModule } from 'src/addresses/modules/regions/regions.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ServiceRepository]),
    AuthModule,
    RegionsModule,
  ],
  exports: [ServicesModule, ServicesService],
})
export class ServicesModule {}
