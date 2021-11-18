import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Client from '../entities/Client.entity';
import IClientRepository from '../../../repositories/IClientRepository';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
class TypeORMClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly ormRepository: Repository<Client>
  ) {}

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { cpf } });

    return client;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { cnpj } });

    return client;
  }

  public async findByInvoiceEmail(
    invoice_email: string
  ): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { invoice_email },
    });

    return client;
  }

  public async findAllClients(): Promise<Client[]> {
    return this.ormRepository.find();
  }

  public async create(userData: CreateClientDTO): Promise<Client> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async update(client: Client) {
    const { id } = client;

    let findClient = await this.findById(id);

    if (findClient) {
      findClient = client;

      await this.save(findClient);

      return findClient;
    }
  }

  public async delete(client: Client) {
    const { id } = client;

    const findClient = await this.findById(id);

    if (findClient) {
      await this.ormRepository.delete(findClient);
    }

    return findClient;
  }
}

export default TypeORMClientRepository;
