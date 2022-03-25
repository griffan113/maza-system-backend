import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';

import IClientRepository from '../repositories/IClientRepository';
@Injectable()
export default class IndexClientsService {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients();

    return clients;
  }
}
