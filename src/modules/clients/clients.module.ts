import { Module } from '@nestjs/common';

import CreateClientService from '@modules/clients/services/CreateClient.service';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import ShowClientService from '@modules/clients/services/ShowClient.service';
import DeleteClientService from '@modules/clients/services/DeleteClient.service';
import UpdateClientService from '@modules/clients/services/UpdateClient.service';
import ClientContactRepository from '@modules/clients/infra/prisma/repositories/ClientContactRepository';
import ClientRepository from '@modules/clients/infra/prisma/repositories/ClientRepository';
import ClientResolver from '@modules/clients/infra/graphql/resolvers/Client.resolver';
import CPFCNPJValidatorProvider from '@modules/clients/providers/DocumentValidatorProvider/implementations/CPFCNPJValidatorProvider';
import RegexCEPValidatorProvider from '@modules/clients/providers/CEPValidatorProvider/implementations/RegexCEPValidatorProvider';
import ViaCepCEPQueryProvider from '@modules/clients/providers/CEPQueryProvider/implementations/ViaCepCEPQueryProvider';

@Module({
  providers: [
    ClientResolver,
    { provide: 'ClientRepository', useClass: ClientRepository },
    { provide: 'ClientContactRepository', useClass: ClientContactRepository },
    { provide: 'CreateClientService', useClass: CreateClientService },
    { provide: 'DeleteClientService', useClass: DeleteClientService },
    { provide: 'UpdateClientService', useClass: UpdateClientService },
    { provide: 'IndexClientsService', useClass: IndexClientsService },
    { provide: 'ShowClientService', useClass: ShowClientService },
    {
      provide: 'DocumentValidatorProvider',
      useClass: CPFCNPJValidatorProvider,
    },
    {
      provide: 'CEPValidatorProvider',
      useClass: RegexCEPValidatorProvider,
    },
    {
      provide: 'CEPQueryProvider',
      useClass: ViaCepCEPQueryProvider,
    },
  ],
  exports: [{ provide: 'ClientRepository', useClass: ClientRepository }],
})
class ClientsModule {}

export default ClientsModule;
