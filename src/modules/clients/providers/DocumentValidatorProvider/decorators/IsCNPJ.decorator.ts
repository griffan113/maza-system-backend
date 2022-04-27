import { registerDecorator, ValidationOptions } from 'class-validator';

import CPFCNPJValidatorProvider from '@modules/clients/providers/DocumentValidatorProvider/implementations/CPFCNPJValidatorProvider';

const IsCNPJ = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return CPFCNPJValidatorProvider.isCNPJValid(value);
        },
      },
    });
  };
};

export default IsCNPJ;