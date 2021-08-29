import { EntityRepository, Repository } from 'typeorm';

import Client from '../entities/Client.entity';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.findOne(id);

    return client;
  }
}

export default ClientRepository;
