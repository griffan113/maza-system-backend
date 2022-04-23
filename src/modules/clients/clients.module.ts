import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/services/Prisma.service';
import CreateClientService from '@modules/clients/services/CreateClient.service';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import ShowClientService from '@modules/clients/services/ShowClient.service';
import UsersModule from '@modules/users/users.module';
import ClientRepository from '@modules/clients/infra/prisma/repositories/ClientRepository';
import ClientResolver from '@modules/clients/infra/graphql/resolvers/Client.resolver';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaService,
    ClientResolver,
    { provide: 'ClientRepository', useClass: ClientRepository },
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'IndexClientsService', useClass: IndexClientsService },
    { provide: 'ShowClientService', useClass: ShowClientService },
  ],
})
class ClientsModule {}

export default ClientsModule;
