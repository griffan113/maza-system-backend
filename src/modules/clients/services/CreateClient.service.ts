import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateClientDTO from '../dtos/CreateClient.dto';
import Client from '../infra/typeorm/entities/Client.entity';
import IClientRepository from '../repositories/IClientRepository';
@Injectable()
class CreateClientService {
  constructor(
    @Inject('ClientRepo')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute(data: CreateClientDTO): Promise<Client> {
    const checkUserExists = await this.clientRepository.findByEmail(
      data.invoice_email
    );

    if (checkUserExists) throw new BadRequestException('Email already used');

    const client = await this.clientRepository.create(data);

    return client;
  }
}

export default CreateClientService;
