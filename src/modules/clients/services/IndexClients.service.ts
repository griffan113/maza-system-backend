import { Inject, Injectable } from '@nestjs/common';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import Client from '@modules/clients/infra/prisma/models/Client';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

@Injectable()
export default class IndexClientsService {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients({
      pagination,
      filter,
    });

    return clients;
  }
}
