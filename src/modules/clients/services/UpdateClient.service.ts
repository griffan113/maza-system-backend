import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client } from '.prisma/client';
import UpdateClientDTO from '../dtos/UpdateClient.dto';
import IClientRepository from '../repositories/IClientRepository';

@Injectable()
export default class UpdateClientService {
  constructor(
    @Inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({
    client_id,
    company_name,
    cnpj,
    cpf,
    invoice_email,
    person_type,
    financial_contact_email,
    financial_contact_name,
    technician_contact_email,
    technician_contact_name,
  }: UpdateClientDTO): Promise<Client> {
    const client = await this.clientRepository.findById(client_id);

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    if (cnpj) {
      const findClientWithThisCnpj = await this.clientRepository.findByCnpj(
        cnpj
      );
      if (findClientWithThisCnpj && findClientWithThisCnpj.id !== client.id) {
        throw new BadRequestException('CNPJ já está em uso.');
      }

      client.cnpj = cnpj;
    }

    if (cpf) {
      const findClientWithThisCpf = await this.clientRepository.findByCpf(cpf);
      if (findClientWithThisCpf && findClientWithThisCpf.id !== client.id) {
        throw new BadRequestException('CPF já está em uso.');
      }

      client.cpf = cpf;
    }

    if (technician_contact_name)
      client.technician_contact_name = technician_contact_name;
    if (technician_contact_email)
      client.technician_contact_email = technician_contact_email;
    if (financial_contact_name)
      client.financial_contact_name = financial_contact_name;
    if (financial_contact_email)
      client.financial_contact_email = financial_contact_email;

    if (company_name) client.company_name = company_name;

    await this.clientRepository.update(client);

    return client;
  }
}
