import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import { PrismaService } from '@shared/services/Prisma.service';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import Product from '@modules/products/infra/prisma/models/Product';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

@Injectable()
export default class ProductRepository implements IProductRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Product | null> {
    const product = await this.ormRepository.product.findUnique({
      where: { id },
    });

    return product;
  }

  public async findAllProducts({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Product[]> {
    const { page, take } = pagination;

    const skip = page === 1 ? 0 : page * take - take;

    const products = await this.ormRepository.product.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            name: {
              contains: filter,
            },
          },
        ],
      },
    });

    return products;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.product.findFirst({
      where: { name },
    });

    return product;
  }

  public async delete(id: string): Promise<Product> {
    const deleteProduct = await this.ormRepository.product.delete({
      where: { id },
    });

    return deleteProduct;
  }

  public async create(productData: CreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.product.create({
      data: productData,
    });

    return product;
  }

  public async update(product: Product): Promise<Product> {
    const { id, ...rest } = product;

    const updateProduct = await this.ormRepository.product.update({
      data: rest,
      where: { id },
    });

    return updateProduct;
  }
}
