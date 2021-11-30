import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AddressesModule } from './addresses/addresses.module';
import { EventsModule } from './events/events.module';
import { ProvidersModule } from './auth/modules/providers/providers.module';
import { ClientsModule } from './auth/modules/clients/clients.module';
import { BusinessesModule } from './businesses/businesses.module';
import { ProductsModule } from './products/products.module';
import { SearchModule } from './search/search.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'proyecto_modulo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProvidersModule,
    ClientsModule,
    AuthModule,
    AddressesModule,
    EventsModule,
    BusinessesModule,
    ProductsModule,
    SearchModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
