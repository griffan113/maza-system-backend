import { Product } from '@prisma/client';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IProductRepository from '@modules/products/repositories/IProductRepository';

interface IRequest {
  id: string;
}

@Injectable()
export default class DeleteProductService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const findProduct = await this.productRepository.findById(id);

    if (!findProduct) throw new NotFoundException('Produto não encontrado.');

    const deleteProduct = await this.productRepository.delete(id);

    return deleteProduct;
  }
}
