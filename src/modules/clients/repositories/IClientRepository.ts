import CreateClientDTO from '../dtos/CreateClient.dto';
import Client from '../infra/typeorm/entities/Client.entity';

interface IClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  findByCpf: (cpf: string) => Promise<Client | undefined>;
  findByCnpj: (cnpj: string) => Promise<Client | undefined>;
  findByInvoiceEmail: (invoice_email: string) => Promise<Client | undefined>;
  findAllClients: () => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  save: (client: Client) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (client: Client) => Promise<void>;
}

export default IClientRepository;
