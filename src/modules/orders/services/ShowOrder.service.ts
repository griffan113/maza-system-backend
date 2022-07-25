import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import Order from '@modules/orders/infra/prisma/models/Order';

interface IRequest {
  order_id: string;
}

@Injectable()
export default class ShowOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  public async execute({ order_id }: IRequest): Promise<Order> {
    const findOrder = await this.orderRepository.findById(order_id);

    if (!findOrder) throw new NotFoundException('Ordere não encontrado.');

    return findOrder;
  }
}
