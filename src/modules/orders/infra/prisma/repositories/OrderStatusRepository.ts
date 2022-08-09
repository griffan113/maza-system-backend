import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import IOrderStatusRepository from '@modules/orders/repositories/IOrderStatusRepository';
import { PrismaService } from '@shared/services/Prisma.service';
import CreateOrderStatusDTO from '@modules/orders/dtos/CreateOrderStatus.dto';
import OrderStatus from '@modules/orders/infra/prisma/models/OrderStatus';

@Injectable()
export default class OrderStatusRepository implements IOrderStatusRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async create(
    orderStatusData: CreateOrderStatusDTO
  ): Promise<OrderStatus> {
    const orderStatus = await this.ormRepository.orderStatus.create({
      data: orderStatusData,
    });

    return orderStatus;
  }

  public async deleteMany(ids: Array<string>): Promise<void> {
    await this.ormRepository.orderStatus.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  public async createMany(data: CreateOrderStatusDTO[]): Promise<void> {
    await this.ormRepository.orderStatus.createMany({
      data,
    });
  }
}
