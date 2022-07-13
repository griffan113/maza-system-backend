import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import Client from '@modules/clients/infra/prisma/models/Client';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import UpdateClientDTO from '@modules/clients/dtos/UpdateClient.dto';

export type FindAllClientsData = {
  pagination: PaginationRequestDTO;
  filter?: string;
};

interface IClientRepository {
  findById: (id: string) => Promise<Client | null>;
  findByCnpj: (cnpj: string) => Promise<Client | null>;
  findByNfeEmail: (nfe_email: string) => Promise<Client | null>;
  findAllClients: (data: FindAllClientsData) => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (data: UpdateClientDTO) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
