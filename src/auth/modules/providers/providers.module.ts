import { forwardRef, Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { AddressesModule } from 'src/addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from './provider.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';
import { PassportModule } from '@nestjs/passport';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [
    TypeOrmModule.forFeature([ProviderRepository, UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    AddressesModule,
    forwardRef(() => ProductsModule),
  ],
  exports: [ProvidersModule, ProvidersService],
})
export class ProvidersModule {}
