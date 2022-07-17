import {
  Order as PrismaOrder,
  OrderEntry,
  OrderItem,
  OrderPaymentMethod,
  OrderStatus,
} from '@prisma/client';

export default class Order implements PrismaOrder {
  id: string;

  order_number: string;

  statuses?: OrderStatus[];

  client_id: string;

  total_price: number;

  total_quantity: number;

  observations: string | null;

  delivery_fee: number | null;

  payment_method: OrderPaymentMethod | null;

  payment_date: Date | null;

  items?: OrderItem[];

  order_entries?: OrderEntry[];

  created_at: Date;

  updated_at: Date;
}
