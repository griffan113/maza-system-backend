import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import Order from '@modules/orders/infra/prisma/models/Order';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import UpdateOrderRequestDTO from '@modules/orders/dtos/UpdateOrderRequest.dto';

@Injectable()
export default class UpdateOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  public async execute({
    order_id,
    ...rest
  }: UpdateOrderRequestDTO): Promise<Order> {
    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      throw new NotFoundException('Ordere não encontrado.');
    }

    await this.orderRepository.update({
      order,
      contacts,
    });

    return order;
  }
}
