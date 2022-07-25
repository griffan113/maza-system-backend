import { Inject, Injectable } from '@nestjs/common';

import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import Order from '@modules/orders/infra/prisma/models/Order';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

@Injectable()
export default class IndexOrdersServiceWithFilters {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  public async execute({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Order[]> {
    const orders = await this.orderRepository.findAllOrders({
      pagination,
      filter,
    });

    return orders;
  }
}
