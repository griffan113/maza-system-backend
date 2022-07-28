import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

import IProductRepository from '@modules/products/repositories/IProductRepository';

interface IRequest {
  product_id: string;
}

@Injectable()
class ShowProductService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({ product_id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return product;
  }
}

export default ShowProductService;
