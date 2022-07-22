import { Product } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';
import IProductRepository from '@modules/products/repositories/IProductRepository';

@Injectable()
export default class IndexProductsService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Product[]> {
    const products = await this.productRepository.findAllProducts({
      pagination,
      filter,
    });

    return products;
  }
}
