export default interface ICEPValidatorProvider {
  isCEPValid(value: string): boolean;
}
