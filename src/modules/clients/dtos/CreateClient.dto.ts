import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';

class CreateClientDTO {
  company_name?: string;

  fantasy_name?: string;

  phone?: string;

  cnpj?: string;

  state_registration?: string;

  nfe_email?: string;

  cep: string;

  address_number?: string;

  address?: string;

  contacts?: CreateClientContactDTO[];
}

export default CreateClientDTO;
