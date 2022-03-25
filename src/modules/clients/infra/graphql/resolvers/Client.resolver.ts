import { Inject, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateClientService from '@modules/clients/services/CreateClient.service';
import { Client } from '@shared/infra/graphql/graphql';
import IndexClientsService from '@modules/clients/services/IndexClients.service';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';

@Resolver(() => Client)
export default class ClientResolver {
  constructor(
    @Inject('CreateClientService')
    private readonly createClientService: CreateClientService,

    @Inject('IndexClientsService')
    private readonly indexClientsService: IndexClientsService
  ) {}

  @Query(() => [Client], { name: 'indexClients' })
  public async index(): Promise<Client[]> {
    const indexClients = await this.indexClientsService.execute();

    return indexClients;
  }

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
