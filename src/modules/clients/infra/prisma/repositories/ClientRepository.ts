import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import UpdateClientDTO from '@modules/clients/dtos/UpdateClient.dto';
import Client from '@modules/clients/infra/prisma/models/Client';
import { PrismaService } from '@shared/services/Prisma.service';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

@Injectable()
export default class ClientRepository implements IClientRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Client | null> {
    const client = await this.ormRepository.client.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });

    return client;
  }

  public async findAllClients({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Client[]> {
    const { page, take } = pagination;

    const skip = page === 1 ? 0 : page * take - take;

    const clients = await this.ormRepository.client.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            cnpj: {
              contains: filter,
            },
          },
          {
            company_name: {
              contains: filter,
            },
          },
        ],
      },
      include: { contacts: true },
    });

    return clients;
  }

  public async findByCnpj(cnpj: string): Promise<Client | null> {
    const client = await this.ormRepository.client.findUnique({
      where: { cnpj },
    });

    return client;
  }

  public async findByNfeEmail(nfe_email: string): Promise<Client | null> {
    const client = await this.ormRepository.client.findFirst({
      where: { nfe_email },
    });

    return client;
  }

  public async delete(id: string): Promise<Client> {
    const deleteClient = await this.ormRepository.client.delete({
      where: { id },
    });

    return deleteClient;
  }

  public async create({
    contacts = [],
    ...rest
  }: CreateClientDTO): Promise<Client> {
    const client = await this.ormRepository.client.create({
      data: {
        ...rest,
        contacts: {
          createMany: { data: contacts },
        },
      },
    });

    return client;
  }

  public async update({
    client,
    contacts = [],
  }: UpdateClientDTO): Promise<Client> {
    const { id, ...rest } = client;

    const updateClient = await this.ormRepository.client.update({
      data: {
        ...rest,
        contacts: {
          createMany: { data: contacts },
        },
      },
      where: { id },
    });

    return updateClient;
  }
}
