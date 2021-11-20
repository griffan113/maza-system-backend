import { BadRequestException } from '@nestjs/common';

import { PersonTypeEnum } from '@modules/clients/types/PersonType.enum';
import FakeClientRepository from '../fakeRepositories/FakeClientRepository';
import CreateClientService from '../../services/CreateClient.service';

describe('CreateClientService', () => {
  let createClientService: CreateClientService;
  let fakeClientRepository: FakeClientRepository;

  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();

    createClientService = new CreateClientService(fakeClientRepository);
  });

  it('should be able to create a new client', async () => {
    const client = await createClientService.execute({
      person_type: PersonTypeEnum.LEGAL,
      company_name: 'Test_Company',
      cpf: '931.282.010-99',
      cnpj: '33.216.468/0001-77',
      invoice_email: 'email@nota.com',
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create a new client with a repeated cpf', async () => {
    await createClientService.execute({
      person_type: PersonTypeEnum.LEGAL,
      company_name: 'Test_Company',
      cpf: '931.282.010-99',
      cnpj: 'non-repeated-cnpj',
      invoice_email: 'email@nota.com',
    });

    await expect(
      createClientService.execute({
        person_type: PersonTypeEnum.LEGAL,
        company_name: 'Test_Company',
        cpf: '931.282.010-99',
        cnpj: 'non-repeated-cnpj2',
        invoice_email: 'non-repeated-email',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to create a new client with a repeated cnpj', async () => {
    await createClientService.execute({
      person_type: PersonTypeEnum.LEGAL,
      company_name: 'Test_Company',
      cpf: 'non-repeated-cpf',
      cnpj: '33.216.468/0001-77',
      invoice_email: 'email@nota.com',
    });

    await expect(
      createClientService.execute({
        person_type: PersonTypeEnum.LEGAL,
        company_name: 'Test_Company',
        cpf: 'non-repeated-cpf2',
        cnpj: '33.216.468/0001-77',
        invoice_email: 'non-repeated-email',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to create a new client with a repeated invoice email', async () => {
    await createClientService.execute({
      person_type: PersonTypeEnum.LEGAL,
      company_name: 'Test_Company',
      cpf: 'non-repeated-cpf',
      cnpj: 'non-repeated-cnpj',
      invoice_email: 'test@email.com',
    });

    await expect(
      createClientService.execute({
        person_type: PersonTypeEnum.LEGAL,
        company_name: 'Test_Company',
        cpf: 'non-repeated-cpf2',
        cnpj: 'non-repeated-cnpj2',
        invoice_email: 'test@email.com',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to create a new client with type legal and empty cnpj', async () => {
    await expect(
      createClientService.execute({
        person_type: PersonTypeEnum.LEGAL,
        company_name: 'Test_Company',
        cpf: 'non-repeated-cpf2',
        invoice_email: 'test@email.com',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to create a new client with type physical and empty cpf', async () => {
    await expect(
      createClientService.execute({
        person_type: PersonTypeEnum.PHYSICAL,
        company_name: 'Test_Company',
        cnpj: 'cnpj',
        invoice_email: 'test@email.com',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
