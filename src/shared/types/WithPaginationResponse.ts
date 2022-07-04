import { IMetadata } from './IMetadata';

export type WithPaginationResponse<T> = {
  metadata: IMetadata;
  data: T;
};
