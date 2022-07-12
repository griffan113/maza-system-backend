import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import IsCNPJ from '@modules/clients/providers/DocumentValidatorProvider/decorators/IsCNPJ.decorator';
import IsCEP from '@modules/clients/providers/CEPValidatorProvider/decorators/IsCEP.decorator';
import CreateClientContactDTO from '@modules/clients/dtos/CreateClientContact.dto';

class UpdateClientRequestDTO {
  @IsNotEmpty()
  @IsUUID()
  client_id: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  fantasy_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsCNPJ({ message: 'CNPJ inválido.' })
  cnpj?: string;

  @IsOptional()
  @IsString()
  state_registration?: string;

  @IsOptional()
  @IsEmail()
  nfe_email?: string;

  @IsOptional()
  @IsString()
  @IsCEP({ message: 'CEP inválido.' })
  cep?: string;

  @IsOptional()
  @IsString()
  address_number?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  contacts?: CreateClientContactDTO[];
}

export default UpdateClientRequestDTO;
