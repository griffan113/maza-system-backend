import { Inject, Injectable } from '@nestjs/common';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import Client from '@modules/clients/infra/prisma/models/Client';
@Injectable()
export default class IndexClientsService {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({
    page,
    take,
  }: Required<PaginationRequestDTO>): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients({ page, take });

    return clients;
  }
}
