import { Body, Get, Inject, UseGuards, ValidationPipe } from '@nestjs/common';
import { Client } from '.prisma/client';
import { Controller, Post } from '@nestjs/common';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import CreateClientService from '@modules/clients/services/CreateClient.service';
import { EnsureAuthenticated } from '@modules/users/infra/http/guards/EnsureAuthenticated.guard';

@UseGuards(EnsureAuthenticated)
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

  @Get('/')
  public async index() {}
}

export default ClientsController;
