import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import Order from '@modules/orders/infra/prisma/models/Order';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import UpdateOrderRequestDTO from '@modules/orders/dtos/UpdateOrderRequest.dto';
import IClientRepository from '@modules/clients/repositories/IClientRepository';

@Injectable()
export default class UpdateOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,

    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute({
    order_id,
    client_id,
    statuses,
    observations,
    payment_method,
    payment_date,
    items,
    order_entries,
  }: UpdateOrderRequestDTO): Promise<Order> {
    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      throw new NotFoundException('Order não encontrada.');
    }

    if (client_id) {
      const findClient = await this.clientRepository.findById(client_id);

      if (!findClient) {
        throw new NotFoundException('Cliente não encontrado.');
      }

      order.client_id = client_id;
    }

    if (payment_date) {
      order.payment_date = payment_date;
    }

    await this.orderRepository.update({
      order,
      statuses,
      items,
      order_entries,
    });

    return order;
  }
}
