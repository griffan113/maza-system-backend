export default interface ICPFCNPJValidatorProvider {
  isCPFValid(value: string): boolean;
  isCNPJValid(value: string): boolean;
}
