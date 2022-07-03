import { Injectable } from '@nestjs/common';

import { WithPaginationResponse } from '@shared/types/WithPaginationResponse';

@Injectable()
export class PaginateService {
  public execute<T>(
    data: T,
    take: number,
    page: number
  ): WithPaginationResponse<T> {
    if (!Array.isArray(data)) throw new Error('Array expected');

    const pageCount = Math.ceil(data.length / take);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    const metadata = {
      pageCount,
      hasNextPage,
      hasPreviousPage,
      take,
      page,
    };

    return {
      data,
      metadata,
    };
  }
}
