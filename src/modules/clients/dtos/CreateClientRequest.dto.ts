import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import IsCNPJ from '@modules/clients/providers/DocumentValidatorProvider/decorators/IsCNPJ.decorator';
import IsCEP from '@modules/clients/providers/CEPValidatorProvider/decorators/IsCEP.decorator';

class CreateClientRequestDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  corporate_name?: string;

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

  @IsNotEmpty()
  @IsString()
  @IsCEP({ message: 'CEP inválido.' })
  cep: string;

  @IsOptional()
  @IsString()
  address_number?: string;
}

export default CreateClientRequestDTO;
