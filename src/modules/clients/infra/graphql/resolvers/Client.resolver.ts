import { Inject, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateClientService from '@modules/clients/services/CreateClient.service';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import ShowClientService from '@modules/clients/services/ShowClient.service';
import DeleteClientService from '@modules/clients/services/DeleteClient.service';
import UpdateClientService from '@modules/clients/services/UpdateClient.service';
import { PaginateService } from '@shared/services/Paginate.service';
import { Client } from '@shared/infra/graphql/graphql';
import { WithPaginationResponse } from '@shared/types/WithPaginationResponse';
import CreateClientRequestDTO from '@modules/clients/dtos/CreateClientRequest.dto';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import UpdateClientRequestDTO from '@modules/clients/dtos/UpdateClientRequest.dto';
import { SetAdminRoute } from '@modules/users/infra/graphql/decorators/SetAdminRoute.decorator';

@SetAdminRoute()
@Resolver('Client')
export default class ClientResolver {
  constructor(
    @Inject('CreateClientService')
    private readonly createClientService: CreateClientService,

    @Inject('UpdateClientService')
    private readonly updateClientService: UpdateClientService,

    @Inject('IndexClientsService')
    private readonly indexClientsService: IndexClientsService,

    @Inject('ShowClientService')
    private readonly showClientService: ShowClientService,

    @Inject('DeleteClientService')
    private readonly deleteClientService: DeleteClientService,

    @Inject('PaginateService')
    private readonly paginateService: PaginateService
  ) {}

  @Query(() => [Client], { name: 'indexClients' })
  public async index(
    @Args('paginationRequestDTO', ValidationPipe)
    { page = 1, take = 5 }: PaginationRequestDTO
  ): Promise<WithPaginationResponse<Client[]>> {
    const indexClients = await this.indexClientsService.execute({ page, take });

    const paginate = this.paginateService.execute(indexClients, take, page);

    return paginate;
  }

  @Query(() => Client, { name: 'showClient' })
  public async show(
    @Args('client_id', ParseUUIDPipe)
    client_id: string
  ): Promise<Client> {
    const showClient = await this.showClientService.execute({ client_id });

    return showClient;
  }

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

  @Mutation(() => Client, { name: 'createClient' })
  public async create(
    @Args('createClientDTO', ValidationPipe)
    createClientRequestDTO: CreateClientRequestDTO
  ): Promise<Client> {
    const createClient = await this.createClientService.execute(
      createClientRequestDTO
    );

    return createClient;
  }

  @Mutation(() => Client, { name: 'updateClient' })
  public async update(
    @Args('updateClientDTO', ValidationPipe)
    updateClientDTO: UpdateClientRequestDTO
  ): Promise<Client> {
    const updateClient = await this.updateClientService.execute(
      updateClientDTO
    );

    return updateClient;
  }
}
