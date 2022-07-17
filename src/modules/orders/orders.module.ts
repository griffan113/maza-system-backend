import { Module } from '@nestjs/common';

import OrderRepository from '@modules/orders/infra/prisma/repositories/OrderRepository';

@Module({
  providers: [{ provide: 'OrderRepository', useValue: OrderRepository }],
})
class OrdersModule {}

export default OrdersModule;
