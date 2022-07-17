import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from '@shared/services/Prisma.service';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import Order from '@modules/orders/infra/prisma/models/Order';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrder.dto';
import UpdateOrderDTO from '@modules/orders/dtos/UpdateOrder.dto';

@Injectable()
export default class OrderRepository implements IOrderRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository.order.findUnique({
      where: { id },
      include: {
        client: true,
        items: true,
        order_entries: true,
        statuses: true,
      },
    });

    return order;
  }

  public async findAllOrders({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<Order[]> {
    const { page, take } = pagination;

    const skip = page === 1 ? 0 : page * take - take;

    const orders = await this.ormRepository.order.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            order_number: {
              contains: filter,
            },
          },
          {
            client: {
              OR: [
                {
                  company_name: {
                    contains: filter,
                  },
                },
              ],
            },
          },
        ],
      },
      include: {
        client: true,
        statuses: true,
      },
    });

    return orders;
  }

  public async findByOrderCode(order_number: string): Promise<Order | null> {
    const order = await this.ormRepository.order.findFirst({
      where: { order_number },
      include: {
        client: true,
      },
    });

    return order;
  }

  public async delete(id: string): Promise<Order> {
    const deleteOrder = await this.ormRepository.order.delete({
      where: { id },
      include: { client: true },
    });

    return deleteOrder;
  }

  public async create({
    statuses = [],
    order_entries = [],
    items = [],
    ...rest
  }: CreateOrderDTO): Promise<Order> {
    const order = await this.ormRepository.order.create({
      data: {
        ...rest,
        items: {
          createMany: { data: items },
        },
        order_entries: {
          createMany: { data: order_entries },
        },
        statuses: { create: statuses },
      },
      include: {
        client: true,
        items: true,
        order_entries: true,
        statuses: true,
      },
    });

    return order;
  }

  public async update({
    order,
    items = [],
    order_entries = [],
    statuses = [],
  }: UpdateOrderDTO): Promise<Order> {
    const { id, ...rest } = order;

    const updateOrder = await this.ormRepository.order.update({
      data: {
        ...rest,
        items: {
          createMany: { data: items },
        },
        order_entries: {
          createMany: { data: order_entries },
        },
        statuses: { create: statuses },
      },
      where: { id },
      include: {
        client: true,
        items: true,
        order_entries: true,
        statuses: true,
      },
    });

    return updateOrder;
  }
}
