import OrderStatus from '@modules/orders/infra/prisma/models/OrderStatus';
import CreateOrderStatusDTO from '@modules/orders/dtos/CreateOrderStatus.dto';

interface IOrderStatusRepository {
  create: (data: CreateOrderStatusDTO) => Promise<OrderStatus>;
  createMany: (data: CreateOrderStatusDTO[]) => Promise<void>;
  deleteMany: (ids: Array<string>) => Promise<void>;
}

export default IOrderStatusRepository;
