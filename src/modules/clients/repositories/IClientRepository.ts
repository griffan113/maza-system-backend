import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import Client from '@modules/clients/infra/prisma/models/Client';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';

export type UpdateData = {
  client: Client;
  contacts?: CreateClientContactDTO[];
};

interface IClientRepository {
  findById: (id: string) => Promise<Client | null>;
  findByCnpj: (cnpj: string) => Promise<Client | null>;
  findByNfeEmail: (nfe_email: string) => Promise<Client | null>;
  findAllClients: (data?: PaginationRequestDTO) => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (data: UpdateData) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
