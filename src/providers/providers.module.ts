import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { AddressesModule } from 'src/addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from './provider.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [
    AuthModule,
    AddressesModule,
    TypeOrmModule.forFeature([ProviderRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'supersuperverysupersecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
})
export class ProvidersModule {}
