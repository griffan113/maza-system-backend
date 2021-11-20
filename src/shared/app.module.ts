import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import OrdersModule from '@modules/orders/orders.module';
import Container from '@shared/container/container.module';
import ClientsModule from '@modules/clients/clients.module';
import UsersModule from '@modules/users/users.module';
import { PrismaService } from '@shared/services/Prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    Container,
    OrdersModule,
    ClientsModule,
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
