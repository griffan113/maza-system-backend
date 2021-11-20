import { Module } from '@nestjs/common';

import ClientsController from './infra/http/controllers/Client.controller';
import CreateClientService from './services/CreateClient.service';
import UsersModule from '@modules/users/users.module';
import ClientRepository from './infra/prisma/ClientRepository';
import { PrismaService } from '@shared/services/Prisma.service';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaService,
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'ClientRepository', useClass: ClientRepository },
  ],
  controllers: [ClientsController],
})
class ClientsModule {}

export default ClientsModule;
