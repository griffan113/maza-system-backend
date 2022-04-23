import { Client } from '.prisma/client';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateClientDTO from '@modules/clients/dtos/CreateClient.dto';
import IClientRepository from '@modules/clients/repositories/IClientRepository';

@Injectable()
class CreateClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute(data: CreateClientDTO): Promise<Client> {
    const { cpf, cnpj, invoice_email, person_type } = data;

    if (person_type === 'LEGAL' && !cnpj) {
      throw new BadRequestException(
        'É necessário informar um CNPJ para uma pessoa jurídica'
      );
    }

    if (person_type === 'PHYSICAL' && !cpf) {
      throw new BadRequestException(
        'É necessário informar um CPF para uma pessoa física.'
      );
    }

    if (cpf) {
      const isCpfAlreadyUsed = await this.clientRepository.findByCpf(cpf);

      if (isCpfAlreadyUsed) throw new BadRequestException('CPF já usado.');
    }

    if (cnpj) {
      const isCnpjAlreadyUsed = await this.clientRepository.findByCnpj(cnpj);

      if (isCnpjAlreadyUsed) throw new BadRequestException('CNPJ já usado.');
    }

    const isInvoiceEmailAlreadyUsed =
      await this.clientRepository.findByInvoiceEmail(invoice_email);

    if (isInvoiceEmailAlreadyUsed)
      throw new BadRequestException('E-mail da nota fiscal já usado.');

    const client = await this.clientRepository.create(data);

    return client;
  }
}

export default CreateClientService;
