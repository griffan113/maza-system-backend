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
    const { cep, cnpj, nfe_email } = data;

    if (cnpj) {
      const parsedCNPJ = cnpj
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1 $2 $3/$4-$5');

      const isCnpjAlreadyUsed = await this.clientRepository.findByCnpj(
        parsedCNPJ
      );

      if (isCnpjAlreadyUsed) throw new BadRequestException('CNPJ já usado.');
    }

    if (nfe_email) {
      const isNfeEmailAlreadyUsed = await this.clientRepository.findByNfeEmail(
        nfe_email
      );

      if (isNfeEmailAlreadyUsed)
        throw new BadRequestException('E-mail da nota fiscal já usado.');
    }

    const cepInfo = await this.cepQueryProvider.getCEPInfo(cep);

    const address = this.cepQueryProvider.buildAddress(cepInfo);

    const client = await this.clientRepository.create({
      ...data,
      address,
    });

    return client;
  }
}

export default CreateClientService;
