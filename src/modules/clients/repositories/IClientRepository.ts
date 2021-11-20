import { Client } from '.prisma/client';

import CreateClientDTO from '../dtos/CreateClient.dto';

interface IClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  findByCpf: (cpf: string) => Promise<Client | undefined>;
  findByCnpj: (cnpj: string) => Promise<Client | undefined>;
  findByInvoiceEmail: (invoice_email: string) => Promise<Client | undefined>;
  findAllClients: () => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
