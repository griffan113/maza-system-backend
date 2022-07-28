import { Client as PrismaClient } from '@prisma/client';

import ClientContact from '@modules/clients/infra/prisma/models/ClientContact';
import Order from '@modules/orders/infra/prisma/models/Order';

export default class Client implements PrismaClient {
  id: string;

  company_name: string | null;

  fantasy_name: string | null;

  phone: string | null;

  cnpj: string | null;

  state_registration: string | null;

  nfe_email: string | null;

  cep: string;

  address_number: string | null;

  address: string | null;

  last_order_number: string | null;

  orders?: Order[];

  contacts?: ClientContact[];

  created_at: Date;

  updated_at: Date;
}
