import { Module } from '@nestjs/common';

import OrderRepository from '@modules/orders/infra/prisma/repositories/OrderRepository';
import OrderResolver from '@modules/orders/infra/graphql/resolvers/Order.resolver';
import CreateOrderService from '@modules/orders/services/CreateOrder.service';
import IndexOrdersServiceWithFilters from '@modules/orders/services/IndexOrders.service';
import UpdateOrderService from '@modules/orders/services/UpdateOrder.service';
import DeleteOrderService from '@modules/orders/services/DeleteOrder.service';
import ShowOrderService from '@modules/orders/services/ShowOrder.service';
import ClientRepository from '@modules/clients/infra/prisma/repositories/ClientRepository';

@Module({
  providers: [
    OrderResolver,
    { provide: 'ClientRepository', useClass: ClientRepository },
    { provide: 'OrderRepository', useValue: OrderRepository },
    { provide: 'CreateOrderService', useClass: CreateOrderService },
    { provide: 'IndexOrdersService', useClass: IndexOrdersServiceWithFilters },
    { provide: 'UpdateOrderService', useClass: UpdateOrderService },
    { provide: 'DeleteOrderService', useClass: DeleteOrderService },
    { provide: 'ShowOrderService', useClass: ShowOrderService },
  ],
})
class OrdersModule {}

export default OrdersModule;
