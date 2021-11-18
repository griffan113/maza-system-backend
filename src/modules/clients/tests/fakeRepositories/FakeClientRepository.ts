import { v4 as uuid } from 'uuid';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import Client from '@modules/clients/infra/typeorm/entities/Client.entity';

import IClientRepository from '../../repositories/IClientRepository';

class FakeClientRepository implements IClientRepository {
  private clients: Client[] = [];

  public async findById(id: string): Promise<Client | undefined> {
    const client = this.clients.find((client) => client.id === id);

    return client;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = this.clients.find((client) => client.cpf === cpf);

    return client;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = this.clients.find((client) => client.cnpj === cnpj);

    return client;
  }

  public async findByInvoiceEmail(
    invoice_email: string
  ): Promise<Client | undefined> {
    const client = this.clients.find(
      (client) => client.invoice_email === invoice_email
    );

    return client;
  }

  public async findAllClients(): Promise<Client[]> {
    return this.clients;
  }

  public async create(clientData: CreateClientDTO): Promise<Client> {
    const client = new Client();

    // Pushes all passaded properties to the client passed in the first param
    Object.assign(client, { id: uuid() }, clientData);

    this.clients.push(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findUser) => findUser.id === client.id
    );

    this.clients[findIndex] = client;

    return client;
  }

  public async update(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findUser) => findUser.id === client.id
    );

    this.clients[findIndex] = client;

    return client;
  }

  public async delete(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findUser) => findUser.id === client.id
    );

    const findClient = this.clients.find((_, index) => findIndex === index);

    return findClient;
  }
}

export default FakeClientRepository;
