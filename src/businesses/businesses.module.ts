import { forwardRef, Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { CategoriesModule } from './modules/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from './business.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryRepository } from './modules/categories/categories.repository';
import { RegionsModule } from 'src/addresses/modules/regions/regions.module';
import { ProvidersModule } from 'src/auth/modules/providers/providers.module';
import { ProviderRepository } from 'src/auth/modules/providers/provider.repository';
import { ShippingsModule } from './modules/shippings/shippings.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      BusinessRepository,
      CategoryRepository,
      ProviderRepository,
    ]),
    forwardRef(() => ProvidersModule),
    AuthModule,
    CategoriesModule,
    RegionsModule,
    ShippingsModule,
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService],
  exports: [BusinessesModule, BusinessesService],
})
export class BusinessesModule {}
