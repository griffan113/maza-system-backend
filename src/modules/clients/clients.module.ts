import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ClientsController from './infra/http/controllers/Client.controller';
import Client from './infra/typeorm/entities/Client.entity';
import TypeORMClientRepository from './infra/typeorm/repositories/ClientRepository';
import CreateClientService from './services/CreateClient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'TypeORMClientRepository', useClass: TypeORMClientRepository },
  ],
  controllers: [ClientsController],
})
class ClientsModule {}

export default ClientsModule;
