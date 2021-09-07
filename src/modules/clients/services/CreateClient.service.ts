import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateClientDTO from '../dtos/CreateClient.dto';
import Client from '../infra/typeorm/entities/Client.entity';
import IClientRepository from '../repositories/IClientRepository';
@Injectable()
class CreateClientService {
  constructor(
    @Inject('TypeORMClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute(data: CreateClientDTO): Promise<Client> {
    const { cpf, cnpj, invoice_email, person_type } = data;

    if (person_type === 'legal' && !cnpj) {
      throw new BadRequestException('CNPJ is required for legal person type.');
    }

    if (person_type === 'physical' && !cpf) {
      throw new BadRequestException('CPF is required for legal person type.');
    }

    const isCpfAlreadyUsed = await this.clientRepository.findByCpf(cpf);

    if (isCpfAlreadyUsed) throw new BadRequestException('CPF already used.');

    const isCnpjAlreadyUsed = await this.clientRepository.findByCnpj(cnpj);

    if (isCnpjAlreadyUsed) throw new BadRequestException('CNPJ already used.');

    const isInvoiceEmailAlreadyUsed =
      await this.clientRepository.findByInvoiceEmail(invoice_email);

    if (isInvoiceEmailAlreadyUsed)
      throw new BadRequestException('Invoice email already used.');

    const client = await this.clientRepository.create(data);

    return client;
  }
}

export default CreateClientService;
