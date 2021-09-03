import { BadRequestException } from '@nestjs/common';
import FakeClientRepository from '../repositories/fakes/FakeClientRepository';
import { PersonType } from '../types/PersonTypeEnum';
import CreateClientService from './CreateClient.service';

describe('CreateClientService', () => {
  let createClientService: CreateClientService;
  let fakeClientRepository: FakeClientRepository;

  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();

    createClientService = new CreateClientService(fakeClientRepository);
  });

  it('should be able to create a new client', async () => {
    const client = await createClientService.execute({
      person_type: PersonType.LEGAL,
      company_name: 'Test_Company',
      cpf: '931.282.010-99',
      cnpj: '33.216.468/0001-77',
      invoice_email: 'email@nota.com',
    });

    expect(client).toHaveProperty('id');
  });

  it('should be not able to create a new client with a repeated email', async () => {
    await createClientService.execute({
      person_type: PersonType.LEGAL,
      company_name: 'Test_Company',
      cpf: '931.282.010-99',
      cnpj: '33.216.468/0001-77',
      invoice_email: 'email@nota.com',
    });

    await expect(
      createClientService.execute({
        person_type: PersonType.LEGAL,
        company_name: 'Test_Company',
        cpf: '931.282.010-99',
        cnpj: '33.216.468/0001-77',
        invoice_email: 'email@nota.com',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
