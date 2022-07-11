import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import IClientContactRepository from '@modules/clients/repositories/IClientContactRepository';
import { PrismaService } from '@shared/services/Prisma.service';
import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';
import ClientContact from '@modules/clients/infra/prisma/models/ClientContact';

@Injectable()
export default class ClientContactRepository
  implements IClientContactRepository
{
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<ClientContact | null> {
    const clientContact = await this.ormRepository.clientContact.findUnique({
      where: { id },
    });

    return clientContact;
  }

  public async delete(id: string): Promise<ClientContact> {
    const deleteClientContact = await this.ormRepository.clientContact.delete({
      where: { id },
    });

    return deleteClientContact;
  }

  public async deleteMany(ids: Array<string>): Promise<void> {
    await this.ormRepository.clientContact.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  public async create(
    clientContactData: CreateClientContactDTO
  ): Promise<ClientContact> {
    const clientContact = await this.ormRepository.clientContact.create({
      data: clientContactData,
    });

    return clientContact;
  }

  public async createMany(data: CreateClientContactDTO[]): Promise<void> {
    await this.ormRepository.clientContact.createMany({
      data,
    });
  }

  public async update(clientContact: ClientContact): Promise<ClientContact> {
    const { id, ...rest } = clientContact;

    const updateClientContact = await this.ormRepository.clientContact.update({
      data: rest,
      where: { id },
    });

    return updateClientContact;
  }
}
