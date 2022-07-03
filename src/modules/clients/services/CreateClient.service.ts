import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import IClientRepository from '@modules/clients/repositories/IClientRepository';
import ICEPQueryProvider from '@modules/clients/providers/CEPQueryProvider/models/ICEPQueryProvider';
import CreateClientRequestDTO from '@modules/clients/dtos/CreateClientRequest.dto';
import Client from '@modules/clients/infra/prisma/models/Client';

@Injectable()
class CreateClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,

    @Inject('CEPQueryProvider')
    private readonly cepQueryProvider: ICEPQueryProvider
  ) {}

  public async execute(data: CreateClientRequestDTO): Promise<Client> {
    const { cep, cnpj, corporate_name, name, nfe_email } = data;

    if (cnpj) {
      const isCnpjAlreadyUsed = await this.clientRepository.findByCnpj(cnpj);

      if (isCnpjAlreadyUsed) throw new BadRequestException('CNPJ já usado.');
    }

    if (nfe_email) {
      const isNfeEmailAlreadyUsed = await this.clientRepository.findByNfeEmail(
        nfe_email
      );

      if (isNfeEmailAlreadyUsed)
        throw new BadRequestException('E-mail da nota fiscal já usado.');
    }

    let client_name = name;

    if (!name && corporate_name) client_name = corporate_name;

    const cepInfo = await this.cepQueryProvider.getCEPInfo(cep);

    const address = this.cepQueryProvider.buildAddress(cepInfo);

    const client = await this.clientRepository.create({
      ...data,
      name: client_name,
      address,
    });

    return client;
  }
}

export default CreateClientService;
