import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import CreateClientDTO from '../dtos/CreateClient.dto';
import Client from '../infra/typeorm/entities/Client.entity';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

@Injectable()
class CreateClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private readonly clientRepository: ClientRepository
  ) {}

  public async execute(data: CreateClientDTO): Promise<Client> {
    const client = this.clientRepository.create(data);
    await this.clientRepository.save(client);

    return client;
  }
}

export default CreateClientService;
