import { OrderStatus } from '@prisma/client';

import Order from '@modules/orders/infra/prisma/models/Order';
import CreateOrderEntryDTO from '@modules/orders/dtos/CreateOrderEntry.dto';
import CreateOrderItemDTO from '@modules/orders/dtos/CreateOrderItem.dto';

type UpdateOrderDTO = {
  order: Order;
  items?: CreateOrderItemDTO[];
  order_entries?: CreateOrderEntryDTO[];
  statuses?: OrderStatus[];
};

export default UpdateOrderDTO;
