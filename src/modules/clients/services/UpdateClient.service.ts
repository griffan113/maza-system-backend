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
    cnpj,
    cep,
    address_number,
    corporate_name,
    fantasy_name,
    name,
    nfe_email,
    phone,
    state_registration,
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

    if (cep) client.cep = cep;
    if (address_number) client.address_number = address_number;
    if (corporate_name) client.corporate_name = corporate_name;
    if (fantasy_name) client.fantasy_name = fantasy_name;
    if (name) client.name = name;
    if (nfe_email) client.nfe_email = nfe_email;
    if (phone) client.phone = phone;
    if (state_registration) client.state_registration = state_registration;

    await this.clientRepository.update(client);

    return client;
  }
}
