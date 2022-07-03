import { Inject, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateClientService from '@modules/clients/services/CreateClient.service';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import ShowClientService from '@modules/clients/services/ShowClient.service';
import DeleteClientService from '@modules/clients/services/DeleteClient.service';
import CreateClientRequestDTO from '@modules/clients/dtos/CreateClientRequest.dto';
import { Client } from '@shared/infra/graphql/graphql';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import { WithPaginationResponse } from '@shared/types/WithPaginationResponse';
import { PaginateService } from '@shared/services/Paginate.service';

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
}
