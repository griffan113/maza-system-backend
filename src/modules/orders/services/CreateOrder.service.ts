import { Inject, Injectable } from '@nestjs/common';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrder.dto';
import Order from '@modules/orders/infra/prisma/models/Order';

@Injectable()
class CreateOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  public async execute({
    client_id,
    statuses,
    observations,
    payment_method,
    payment_date,
    items,
    order_entries,
  }: CreateOrderDTO): Promise<Order> {
    const order = await this.orderRepository.create({
      client_id,
      statuses,
      observations,
      payment_method,
      payment_date,
      items,
      order_entries,
      order_number: '220635',
      total_price: 0,
      total_quantity: 0,
    });

    return order;
  }
}

export default CreateOrderService;
