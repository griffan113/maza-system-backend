import CreateClientRequestDTO from '@modules/clients/dtos/CreateClientRequest.dto';

type CreateClientDTO = {
  address?: string;
} & CreateClientRequestDTO;

export default CreateClientDTO;
