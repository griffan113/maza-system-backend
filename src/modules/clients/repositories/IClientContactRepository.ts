import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';
import ClientContact from '@modules/clients/infra/prisma/models/ClientContact';

interface IClientContactRepository {
  findById: (id: string) => Promise<ClientContact | null>;
  create: (data: CreateClientContactDTO) => Promise<ClientContact>;
  createMany: (data: CreateClientContactDTO[]) => Promise<void>;
  update: (client: ClientContact) => Promise<ClientContact>;
  delete: (id: string) => Promise<ClientContact>;
  deleteMany: (ids: Array<string>) => Promise<void>;
}

export default IClientContactRepository;
