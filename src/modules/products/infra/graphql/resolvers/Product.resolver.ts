import {
  DefaultValuePipe,
  Inject,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Product } from '@shared/infra/graphql/graphql';
import { PaginateService } from '@shared/services/Paginate.service';
import CreateProductDTO from '@modules/products/dtos/CreateProduct.dto';
import UpdateProductDTO from '@modules/products/dtos/UpdateProduct.dto';
import CreateProductService from '@modules/products/services/CreateProduct.service';
import IndexProductsService from '@modules/products/services/IndexProducts.service';
import UpdateProductService from '@modules/products/services/UpdateProduct.service';
import DeleteProductService from '@modules/products/services/DeleteProduct.service';
import ShowProductService from '@modules/products/services/ShowProduct.service';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import { WithPaginationResponse } from '@shared/types/WithPaginationResponse';

@Resolver('Product')
export default class ProductResolver {
  constructor(
    @Inject('CreateProductService')
    private readonly createProductService: CreateProductService,

    @Inject('IndexProductsService')
    private readonly indexProductsService: IndexProductsService,

    @Inject('UpdateProductService')
    private readonly updateProductService: UpdateProductService,

    @Inject('DeleteProductService')
    private readonly deleteProductService: DeleteProductService,

    @Inject('ShowProductService')
    private readonly showProductService: ShowProductService,

    @Inject('PaginateService')
    private readonly paginateService: PaginateService
  ) {}

  @Mutation(() => Product, { name: 'createProduct' })
  public async create(
    @Args('createProductDTO', ValidationPipe)
    createProductDTO: CreateProductDTO
  ) {
    const createProduct = await this.createProductService.execute(
      createProductDTO
    );

    return createProduct;
  }

  @Query(() => [Product], { name: 'indexProducts' })
  public async index(
    @Args(
      'paginationRequestDTO',
      ValidationPipe,
      new DefaultValuePipe<PaginationRequestDTO>({ page: 1, take: 5 })
    )
    pagination: PaginationRequestDTO,

    @Args('filter', new DefaultValuePipe(''))
    filter: string
  ): Promise<WithPaginationResponse<Product[]>> {
    const indexProducts = await this.indexProductsService.execute({
      pagination,
      filter,
    });

    const paginate = this.paginateService.execute(
      indexProducts,
      pagination.take,
      pagination.page
    );

    return paginate;
  }

  @Query(() => Product, { name: 'showProduct' })
  public async show(
    @Args('product_id', ParseUUIDPipe)
    product_id: string
  ) {
    const showProduct = await this.showProductService.execute({ product_id });

    return showProduct;
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  public async update(
    @Args('updateProductDTO', ValidationPipe)
    updateProductDTO: UpdateProductDTO
  ) {
    const updateProduct = await this.updateProductService.execute(
      updateProductDTO
    );

    return updateProduct;
  }

  @Mutation(() => Product, { name: 'deleteProduct' })
  public async delete(
    @Args('id', ParseUUIDPipe)
    id: string
  ) {
    const deleteProduct = await this.deleteProductService.execute({
      id,
    });

    return deleteProduct;
  }
}
