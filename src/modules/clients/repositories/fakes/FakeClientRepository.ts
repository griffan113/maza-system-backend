import { v4 as uuid } from 'uuid';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import Client from '@modules/clients/infra/typeorm/entities/Client.entity';

import IClientRepository from '../IClientRepository';

class FakeClientRepository implements IClientRepository {
  private users: Client[] = [];

  public async findById(id: string): Promise<Client | undefined> {
    const client = this.users.find((client) => client.id === id);

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const user = this.users.find((user) => user.invoice_email === email);

    return user;
  }

  public async create(userData: CreateClientDTO): Promise<Client> {
    const client = new Client();

    // Pushes all passaded properties to the client passed in the first param
    Object.assign(client, { id: uuid() }, userData);

    this.users.push(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === client.id
    );

    this.users[findIndex] = client;

    return client;
  }
}

export default FakeClientRepository;
