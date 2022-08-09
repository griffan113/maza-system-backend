import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { format } from 'date-fns';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IOrderStatusRepository from '@modules/orders/repositories/IOrderStatusRepository';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrder.dto';
import Order from '@modules/orders/infra/prisma/models/Order';
import { OrderStatusEnum } from '@prisma/client';

@Injectable()
class CreateOrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,

    @Inject('OrderStatusRepository')
    private readonly orderStatusRepository: IOrderStatusRepository,

    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  public async execute({
    client_id,
    observations,
    payment_method,
    payment_date,
    items,
    order_entries,
  }: CreateOrderDTO): Promise<Order> {
    const findClient = await this.clientRepository.findById(client_id);

    if (!findClient) throw new NotFoundException('Cliente não encontrado');

    let order_number: string;

    const { last_order_number } = findClient;

    // Formato: 22_07_01 - Onde: 22 = Ano, 07 = Mês, 01 = Número da ordem no mês
    if (last_order_number) {
      const year = Number(last_order_number.split('_')[0]);
      const month = Number(last_order_number.split('_')[1]);
      const lastMonthOrderNumber = Number(last_order_number.split('_')[2]);

      const sumLastMonthOrderNumber = String(lastMonthOrderNumber + 1).padStart(
        2,
        '0'
      );

      const constructOrderNumber = format(new Date(), "yy'_'MM'_'").concat(
        sumLastMonthOrderNumber
      );

      findClient.last_order_number = constructOrderNumber;
      order_number = constructOrderNumber;
    } else {
      const constructOrderNumber = format(new Date(), "yy'_'MM'_01'");

      findClient.last_order_number = constructOrderNumber;
      order_number = constructOrderNumber;
    }

    let status: OrderStatusEnum;

    if (order_entries && order_entries.length > 0) {
      status = 'RECEPT';
    } else if (items && items.length > 0) {
      status = 'IN_PROGRESS';
    } else
      throw new BadRequestException(
        'Uma ordem precisa de entradas ou itens para sua criação'
      );

    delete findClient.orders; // Isso é para o Prisma não dar erro quando fazer o update

    await this.clientRepository.update({ client: findClient });

    const order = await this.orderRepository.create({
      client_id,
      status,
      observations,
      payment_method,
      payment_date,
      items,
      order_entries,
      order_number,
      total_price: 0,
      total_quantity: 0,
    });

    return order;
  }
}

export default CreateOrderService;
