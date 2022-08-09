import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import Order from '@modules/orders/infra/prisma/models/Order';
import OrderRepository from '../infra/prisma/repositories/OrderRepository';
import { PrismaService } from '@shared/services/Prisma.service';

interface IRequest {
  order_id: string;
}

@Injectable()
export default class ShowOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {
    this.orderRepository = new OrderRepository(new PrismaService());
  }

  public async execute({ order_id }: IRequest): Promise<Order> {
    const findOrder = await this.orderRepository.findById(order_id);

    if (!findOrder) throw new NotFoundException('Order não encontrado.');

    return findOrder;
  }
}
