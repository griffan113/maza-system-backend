import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import OrdersModule from '@modules/orders/orders.module';
import Container from '@shared/container/container.module';
import ClientsModule from '@modules/clients/clients.module';
import UsersModule from '@modules/users/users.module';
import { PrismaService } from '@shared/services/Prisma.service';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/shared/infra/graphql/graphql.ts'),
        outputAs: 'class',
      },
      typePaths: ['./**/*.graphql'],
    }),
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
