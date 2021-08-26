import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrdersModule from '@modules/orders/orders.module';
import Container from '@shared/container/container.module';
import ClientsModule from '@modules/clients/clients.module';
import UsersModule from '@modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(),
    Container,
    OrdersModule,
    ClientsModule,
    UsersModule,
  ],
})
export class AppModule {}
