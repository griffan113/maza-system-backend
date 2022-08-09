import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import Client from '@modules/clients/infra/prisma/models/Client';

interface IRequest {
  id: string;
}

@Injectable()
export default class DeleteClientService {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Client> {
    const findClient = await this.clientRepository.findById(id);

    if (!findClient) throw new NotFoundException('Cliente não encontrado.');

    const deleteClient = await this.clientRepository.delete(id);

    return deleteClient;
  }
}
