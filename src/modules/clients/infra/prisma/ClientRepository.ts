import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Client } from '@prisma/client';

import { PrismaService } from '@shared/services/Prisma.service';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';

@Injectable()
export default class ClientRepository implements IClientRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.client.findUnique({
      where: { id },
    });

    return client;
  }

  public async findAllClients(): Promise<Client[]> {
    const clients = await this.ormRepository.client.findMany();

    return clients;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = await this.ormRepository.client.findUnique({
      where: { cpf },
    });

    return client;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = await this.ormRepository.client.findUnique({
      where: { cnpj },
    });

    return client;
  }

  public async findByInvoiceEmail(
    invoice_email: string
  ): Promise<Client | undefined> {
    const client = await this.ormRepository.client.findFirst({
      where: { invoice_email },
    });

    return client;
  }

  public async delete(id: string): Promise<Client> {
    const deleteClient = await this.ormRepository.client.delete({
      where: { id },
    });

    return deleteClient;
  }

  public async create(clientData: CreateClientDTO): Promise<Client> {
    const client = await this.ormRepository.client.create({
      data: clientData,
    });

    return client;
  }

  public async update(client: Client): Promise<Client> {
    const { id, ...rest } = client;

    const updateUser = await this.ormRepository.client.update({
      data: rest,
      where: { id },
    });

    return updateUser;
  }
}
