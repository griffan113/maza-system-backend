import { Inject, Injectable } from '@nestjs/common';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import Client from '@modules/clients/infra/prisma/models/Client';

interface IIndexClientsServiceWithFiltersRequest {
  pagination: PaginationRequestDTO;
  filter?: string;
}

@Injectable()
export default class IndexClientsServiceWithFilters {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({
    pagination,
    filter,
  }: IIndexClientsServiceWithFiltersRequest): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients({
      pagination,
      filter,
    });

    return clients;
  }
}
