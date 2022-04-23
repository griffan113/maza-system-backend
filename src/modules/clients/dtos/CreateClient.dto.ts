import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import IsCNPJ from '@modules/clients/providers/DocumentValidatorProvider/decorators/IsCNPJ.decorator';
import IsCPF from '@modules/clients/providers/DocumentValidatorProvider/decorators/IsCPF.decorator';
import { PersonTypeEnum } from '@modules/clients/types/PersonType.enum';

class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([PersonTypeEnum.LEGAL, PersonTypeEnum.PHYSICAL])
  person_type: PersonTypeEnum;

  @IsOptional()
  @IsCPF({ message: 'CPF inválido.' })
  cpf?: string;

  @IsOptional()
  @IsCNPJ({ message: 'CNPJ inválido.' })
  cnpj?: string;

  @IsOptional()
  @IsString()
  financial_contact_name?: string;

  @IsOptional()
  @IsString()
  technician_contact_name?: string;

  @IsOptional()
  @IsEmail()
  financial_contact_email?: string;

  @IsOptional()
  @IsEmail()
  technician_contact_email?: string;

  @IsOptional()
  @IsEmail()
  invoice_email: string;
}

export default CreateClientDTO;
