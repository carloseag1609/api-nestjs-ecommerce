import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { CategoriesModule } from './modules/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from './business.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryRepository } from './modules/categories/categories.repository';
import { ProvidersModule } from 'src/auth/modules/providers/providers.module';
import { RegionsModule } from 'src/addresses/modules/regions/regions.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([BusinessRepository, CategoryRepository]),
    AuthModule,
    CategoriesModule,
    ProvidersModule,
    RegionsModule,
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
