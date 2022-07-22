import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import IProductRepository from '@modules/products/repositories/IProductRepository';

@Injectable()
class CreateProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  public async execute({
    name,
    price,
    diameter,
    teeth_number,
  }: CreateProductDTO) {
    const checkProductExists = await this.productRepository.findByName(name);

    if (checkProductExists)
      throw new BadRequestException('Um produto com esse nome já existe.');

    const product = await this.productRepository.create({
      name,
      price,
      diameter,
      teeth_number,
    });

    return product;
  }
}

export default CreateProductService;
