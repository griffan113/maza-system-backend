import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

import ICEPQueryProvider from '@modules/clients/providers/CEPQueryProvider/models/ICEPQueryProvider';
import IViaCepResponse from '@modules/clients/providers/CEPQueryProvider/types/IViaCepResponse';

@Injectable()
class ViaCepCEPQueryProvider implements ICEPQueryProvider {
  private base_url = 'https://viacep.com.br/ws/';

  public async getCEPInfo(value: string): Promise<IViaCepResponse> {
    try {
      const response = await axios.get(`${this.base_url}${value}/json`);

      const data = await response.data;

      if (data.erro) throw new BadRequestException('CEP não encontrado.');

      return data;
    } catch {
      throw new BadRequestException('CEP inválido.');
    }
  }

  public buildAddress(value: IViaCepResponse): string {
    return `${value.logradouro} - ${value.bairro}, ${value.localidade} - ${value.uf}`;
  }
}

export default ViaCepCEPQueryProvider;
