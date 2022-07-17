import Order from '@modules/orders/infra/prisma/models/Order';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrder.dto';

interface IOrderRepository {
  findById: (id: string) => Promise<Order | null>;
  findByOrderCode: (order_code: string) => Promise<Order | null>;
  findAllOrders: (data: PaginationWithFiltersDTO) => Promise<Order[]>;
  create: (data: CreateOrderDTO) => Promise<Order>;
  // update: (data: UpdateOrderDTO) => Promise<Order>;
  delete: (id: string) => Promise<Order>;
}

export default IOrderRepository;
