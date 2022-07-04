import IViaCepResponse from '@modules/clients/providers/CEPQueryProvider/types/IViaCepResponse';

export default interface ICEPQueryProvider {
  getCEPInfo(value: string): Promise<IViaCepResponse>;
  buildAddress(value: IViaCepResponse): string;
}
