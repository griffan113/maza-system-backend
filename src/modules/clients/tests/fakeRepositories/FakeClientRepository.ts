import { v4 as uuid } from 'uuid';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import UpdateClientDTO from '@modules/clients/dtos/UpdateClient.dto';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import Client from '@modules/clients/infra/prisma/models/Client';
import ClientContact from '@modules/clients/infra/prisma/models/ClientContact';

class FakeClientRepository implements IClientRepository {
  private clients: Client[] = [];

  public async findById(id: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.id === id);

    return client || null;
  }

  public async findByCnpj(cnpj: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.cnpj === cnpj);

    return client || null;
  }

  public async findByNfeEmail(nfe_email: string): Promise<Client | null> {
    const client = this.clients.find(
      (client) => client.nfe_email === nfe_email
    );

    return client || null;
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

  public async update({
    client,
    contacts = [],
  }: UpdateClientDTO): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findUser) => findUser.id === client.id
    );

    let createdContacts: ClientContact[];

    contacts.forEach((contactDTO) => {
      const clientContact = new ClientContact();

      // Pushes all passaded properties to the client passed in the first param
      Object.assign(clientContact, { id: uuid() }, contactDTO);

      createdContacts.push(clientContact);
    });

    this.clients[findIndex] = client;

    return client;
  }

  public async delete(id: string): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findClient) => findClient.id === id
    );

    this.clients.splice(findIndex, 1);

    return this.clients[findIndex];
  }
}

export default FakeClientRepository;
