import { Client } from '.prisma/client';

import CreateClientDTO from '../dtos/CreateClient.dto';

interface IClientRepository {
  findById: (id: string) => Promise<Client | null>;
  findByCnpj: (cnpj: string) => Promise<Client | null>;
  findByNfeEmail: (nfe_email: string) => Promise<Client | null>;
  findAllClients: () => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
