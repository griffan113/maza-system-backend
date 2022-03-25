import { Module } from '@nestjs/common';

import ClientsController from './infra/http/controllers/Client.controller';
import CreateClientService from './services/CreateClient.service';
import IndexClientsService from './services/IndexClients.service';
import UsersModule from '@modules/users/users.module';
import ClientRepository from './infra/prisma/ClientRepository';
import { PrismaService } from '@shared/services/Prisma.service';
import ClientResolver from './infra/graphql/resolvers/Client.resolver';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaService,
    ClientResolver,
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'IndexClientsService', useClass: IndexClientsService },
    { provide: 'ClientRepository', useClass: ClientRepository },
  ],
  controllers: [ClientsController],
})
class ClientsModule {}

export default ClientsModule;
