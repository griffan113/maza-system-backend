import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Client from '../entities/Client.entity';
import IClientRepository from '../../../repositories/IClientRepository';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';

class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly ormRepository: Repository<Client>
  ) {}

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  public async create(userData: CreateClientDTO): Promise<Client> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}

export default ClientRepository;
