import { registerDecorator, ValidationOptions } from 'class-validator';

import RegexCEPValidatorProvider from '@modules/clients/providers/CEPValidatorProvider/implementations/RegexCEPValidatorProvider';

const IsCEP = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCEP',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return RegexCEPValidatorProvider.isCEPValid(value);
        },
      },
    });
  };
};

export default IsCEP;
