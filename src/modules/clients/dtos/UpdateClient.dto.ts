import Client from '@modules/clients/infra/prisma/models/Client';
import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';

type UpdateClientDTO = {
  client: Client;
  contacts?: CreateClientContactDTO[];
};

export default UpdateClientDTO;
