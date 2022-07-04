import { Client } from '.prisma/client';

import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';

interface IClientRepository {
  findById: (id: string) => Promise<Client | null>;
  findByCnpj: (cnpj: string) => Promise<Client | null>;
  findByNfeEmail: (nfe_email: string) => Promise<Client | null>;
  findAllClients: (data?: PaginationRequestDTO) => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
