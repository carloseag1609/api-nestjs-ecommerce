import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PassportModule } from '@nestjs/passport';
import { AddressesModule } from 'src/addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsRepository } from './clients.repository';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    AddressesModule,
    TypeOrmModule.forFeature([ClientsRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class ClientsModule {}
