import CreateProductDTO from '@modules/products/dtos/CreateProduct.dto';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';
import Product from '@modules/products/infra/prisma/models/Product';

interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAllProducts(data: PaginationWithFiltersDTO): Promise<Product[]>;
  findByName(name: string): Promise<Product | null>;
  create(data: CreateProductDTO): Promise<Product>;
  update(data: CreateProductDTO): Promise<Product>;
  delete(id: string): Promise<Product>;
}

export default IProductRepository;
