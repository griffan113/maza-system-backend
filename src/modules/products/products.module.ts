import { Module } from '@nestjs/common';

import ProductRepository from '@modules/products/infra/prisma/repositories/ProductRepository';
import ProductResolver from '@modules/products/infra/graphql/resolvers/Product.resolver';
import CreateProductService from '@modules/products/services/CreateProduct.service';
import IndexProductsService from '@modules/products/services/IndexProducts.service';
import UpdateProductService from '@modules/products/services/UpdateProduct.service';
import DeleteProductService from '@modules/products/services/DeleteProduct.service';
import ShowProductService from '@modules/products/services/ShowProduct.service';

@Module({
  providers: [
    ProductResolver,
    { provide: 'ProductRepository', useClass: ProductRepository },
    { provide: 'CreateProductService', useClass: CreateProductService },
    { provide: 'IndexProductsService', useClass: IndexProductsService },
    { provide: 'UpdateProductService', useClass: UpdateProductService },
    { provide: 'DeleteProductService', useClass: DeleteProductService },
    { provide: 'ShowProductService', useClass: ShowProductService },
  ],
})
export default class ProductsModule {}
