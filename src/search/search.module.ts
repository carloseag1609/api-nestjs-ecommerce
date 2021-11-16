import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products/products.module';
import { ServicesModule } from 'src/services/services.module';
import { BusinessesModule } from 'src/businesses/businesses.module';
import { ProvidersModule } from 'src/auth/modules/providers/providers.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ProductsModule, ServicesModule, BusinessesModule, ProvidersModule],
})
export class SearchModule {}
