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

  public async execute(data: CreateOrderDTO): Promise<Order> {
    const order = await this.orderRepository.create({
      ...data,
    });

    return order;
  }
}

export default CreateOrderService;
