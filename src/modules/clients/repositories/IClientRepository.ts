import Client from '@modules/clients/infra/prisma/models/Client';
import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import UpdateClientDTO from '@modules/clients/dtos/UpdateClient.dto';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

interface IClientRepository {
  findById: (id: string) => Promise<Client | null>;
  findByCnpj: (cnpj: string) => Promise<Client | null>;
  findByNfeEmail: (nfe_email: string) => Promise<Client | null>;
  findAllClients: (data: PaginationWithFiltersDTO) => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (data: UpdateClientDTO) => Promise<Client>;
  delete: (id: string) => Promise<Client>;
}

export default IClientRepository;
