import {
  OrderStatus as PrismaOrderStatus,
  OrderStatusEnum,
} from '@prisma/client';

export default class OrderStatus implements PrismaOrderStatus {
  id: string;

  date: Date;

  status: OrderStatusEnum;

  created_at: Date;

  updated_at: Date;
}
