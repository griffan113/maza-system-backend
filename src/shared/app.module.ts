import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';

import OrdersModule from '@modules/orders/orders.module';
import Container from '@shared/container/container.module';
import ClientsModule from '@modules/clients/clients.module';
import UsersModule from '@modules/users/users.module';
import { PrismaService } from '@shared/services/Prisma.service';
import { EnsureAuthenticated } from '@modules/users/infra/graphql/guards/EnsureAuthenticated.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
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
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: EnsureAuthenticated,
    },
  ],
})
export class AppModule {}
