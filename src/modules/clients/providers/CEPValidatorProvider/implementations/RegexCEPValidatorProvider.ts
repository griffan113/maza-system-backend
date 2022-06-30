import { Injectable } from '@nestjs/common';
import { max } from 'class-validator';

import ICEPValidatorProvider from '../models/ICEPValidatorProvider';

@Injectable()
class RegexCEPValidatorProvider implements ICEPValidatorProvider {
  private cep_regex = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;
  private static cep_regex = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;

  public static isCEPValid(value: string): boolean {
    if (max(value, 8)) return false;

    return this.cep_regex.test(value.trim());
  }

  public isCEPValid(value: string): boolean {
    if (max(value, 8)) return false;

    return this.cep_regex.test(value.trim());
  }
}

export default RegexCEPValidatorProvider;
