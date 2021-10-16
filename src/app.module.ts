import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AddressesModule } from './addresses/addresses.module';
import { EventsModule } from './events/events.module';
import { ProvidersModule } from './auth/modules/providers/providers.module';
import { ClientsModule } from './auth/modules/clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'basic_auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProvidersModule,
    ClientsModule,
    AuthModule,
    AddressesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
