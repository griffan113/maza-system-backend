import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ClientsController from './infra/http/controllers/Client.controller';
import ClientRepository from './infra/typeorm/repositories/ClientRepository';
import CreateClientService from './services/CreateClient.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  controllers: [ClientsController],
  providers: [
    { provide: 'CreateClientService', useClass: CreateClientService },
  ],
})
class ClientsModule {}

export default ClientsModule;
