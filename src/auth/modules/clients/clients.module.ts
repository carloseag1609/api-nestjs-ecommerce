import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AddressesModule } from 'src/addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    AddressesModule,
    AuthModule,
    TypeOrmModule.forFeature([ClientRepository, UsersRepository]),
  ],
  exports: [ClientsModule],
})
export class ClientsModule {}
