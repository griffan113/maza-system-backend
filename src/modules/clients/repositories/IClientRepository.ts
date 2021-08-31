import CreateClientDTO from '../dtos/CreateClient.dto';
import Client from '../infra/typeorm/entities/Client.entity';

interface IClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  create: (data: CreateClientDTO) => Promise<Client>;
  save: (client: Client) => Promise<Client>;
}

export default IClientRepository;
