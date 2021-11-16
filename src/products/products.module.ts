import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { RegionsModule } from 'src/addresses/modules/regions/regions.module';
import { ProductsShippingModule } from './modules/products-shipping/products-shipping.module';
import { BusinessesModule } from 'src/businesses/businesses.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    RegionsModule,
    ProductsShippingModule,
    BusinessesModule,
    QuestionsModule,
    AnswersModule,
  ],
  exports: [ProductsModule, ProductsService],
})
export class ProductsModule {}
