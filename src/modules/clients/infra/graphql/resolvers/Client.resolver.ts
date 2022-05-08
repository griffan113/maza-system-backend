import { Inject, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Client } from '@shared/infra/graphql/graphql';
import CreateClientService from '@modules/clients/services/CreateClient.service';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import ShowClientService from '@modules/clients/services/ShowClient.service';
import DeleteClientService from '@modules/clients/services/DeleteClient.service';
import { SetAdminRoute } from '@modules/users/infra/graphql/decorators/SetAdminRoute.decorator';

@Resolver(() => Client)
export default class ClientResolver {
  constructor(
    @Inject('CreateClientService')
    private readonly createClientService: CreateClientService,

    @Inject('IndexClientsService')
    private readonly indexClientsService: IndexClientsService,

    @Inject('ShowClientService')
    private readonly showClientService: ShowClientService,

    @Inject('DeleteClientService')
    private readonly deleteClientService: DeleteClientService
  ) {}

  @Query(() => [Client], { name: 'indexClients' })
  public async index(): Promise<Client[]> {
    const indexClients = await this.indexClientsService.execute();

    return indexClients;
  }

  @Query(() => Client, { name: 'showClient' })
  public async show(
    @Args('client_id', ParseUUIDPipe)
    client_id: string
  ): Promise<Client> {
    const showClient = await this.showClientService.execute({ client_id });

    return showClient;
  }

  @SetAdminRoute()
  @Mutation(() => Client, { name: 'deleteClient' })
  public async delete(
    @Args('id', ParseUUIDPipe)
    id: string
  ) {
    const deleteClient = await this.deleteClientService.execute({
      id,
    });

    return deleteClient;
  }

  @SetAdminRoute()
  @Mutation(() => Client, { name: 'createClient' })
  public async create(
    @Args('createClientDTO', ValidationPipe)
    createClientDTO: CreateClientDTO
  ): Promise<Client> {
    const createClient = await this.createClientService.execute(
      createClientDTO
    );

    return createClient;
  }
}
