import { Body, Inject, ValidationPipe } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import CreateClientService from '@modules/clients/services/CreateClient.service';
import Client from '../../typeorm/entities/Client.entity';

@Controller('/clients')
class ClientsController {
  constructor(
    @Inject('CreateClientService')
    private readonly createClientService: CreateClientService
  ) {}

  @Post('/')
  public async create(
    @Body(ValidationPipe) createClientDto: CreateClientDTO
  ): Promise<Client> {
    const createClient = await this.createClientService.execute(
      createClientDto
    );

    return createClient;
  }
}

export default ClientsController;
