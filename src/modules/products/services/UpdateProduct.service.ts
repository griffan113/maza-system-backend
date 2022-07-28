import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';

import UpdateProductDTO from '@modules/products/dtos/UpdateProductDTO';
import IProductRepository from '@modules/products/repositories/IProductRepository';

@Injectable()
export default class UpdateProductService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({
    product_id,
    name,
    price,
    diameter,
    teeth_number,
  }: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (name) {
      const findExistingProduct = await this.productRepository.findByName(name);
      if (findExistingProduct && findExistingProduct.id !== product.id) {
        throw new BadRequestException('Um produto com esse nome já existe.');
      }

      product.name = name;
    }

    if (price) product.price = price;
    if (diameter) product.diameter = diameter;
    if (teeth_number) product.teeth_number = teeth_number;

    await this.productRepository.update(product);

    return product;
  }
}
