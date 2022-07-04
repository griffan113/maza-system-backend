import { registerDecorator, ValidationOptions } from 'class-validator';

import CPFCNPJValidatorProvider from '@modules/clients/providers/DocumentValidatorProvider/implementations/CPFCNPJValidatorProvider';

const IsCPF = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return CPFCNPJValidatorProvider.isCPFValid(value);
        },
      },
    });
  };
};

export default IsCPF;
