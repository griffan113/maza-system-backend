import { Injectable } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import ICPFCNPJValidatorProvider from '../models/ICPFCNPJValidatorProvider';

@Injectable()
class CPFCNPJValidatorProvider implements ICPFCNPJValidatorProvider {
  public static isCPFValid(value: string): boolean {
    return cpf.isValid(String(value));
  }

  public static isCNPJValid(value: string): boolean {
    return cnpj.isValid(String(value));
  }

  public isCPFValid(value: string): boolean {
    return cpf.isValid(String(value));
  }

  public isCNPJValid(value: string): boolean {
    return cnpj.isValid(String(value));
  }
}

export default CPFCNPJValidatorProvider;
