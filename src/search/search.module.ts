import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products/products.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ProductsModule, ServicesModule],
})
export class SearchModule {}
