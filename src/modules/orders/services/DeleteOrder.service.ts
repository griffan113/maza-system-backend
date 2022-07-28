import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import Order from '@modules/orders/infra/prisma/models/Order';

interface IRequest {
  id: string;
}

@Injectable()
export default class DeleteOrderService {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Order> {
    const findOrder = await this.orderRepository.findById(id);

    if (!findOrder) throw new NotFoundException('Ordem não encontrada.');

    const deleteOrder = await this.orderRepository.delete(id);

    return deleteOrder;
  }
}
