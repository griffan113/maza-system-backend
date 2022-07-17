import {
  Order as PrismaOrder,
  OrderEntries,
  OrderItem,
  OrderPaymentMethod,
  OrderStatus,
} from '@prisma/client';

import Client from '@modules/clients/infra/prisma/models/Client';

export default class Order implements PrismaOrder {
  id: string;

  order_number: string;

  statuses?: OrderStatus[];

  client_id: string;

  client: Client;

  total_price: number;

  total_quantity: number;

  observations: string | null;

  delivery_fee: number | null;

  payment_method: OrderPaymentMethod | null;

  payment_date: Date | null;

  items?: OrderItem[];

  order_entries?: OrderEntries[];

  created_at: Date;

  updated_at: Date;
}
