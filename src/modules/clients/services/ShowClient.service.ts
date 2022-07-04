import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '@prisma/client';

import IClientRepository from '@modules/clients/repositories/IClientRepository';

interface IRequest {
  client_id: string;
}

@Injectable()
export default class ShowClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute({ client_id }: IRequest): Promise<Client> {
    const findClient = await this.clientRepository.findById(client_id);

    if (!findClient) throw new NotFoundException('Cliente não encontrado.');

    return findClient;
  }
}
