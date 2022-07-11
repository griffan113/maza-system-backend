import { ClientContact as PrismaClientContact } from '@prisma/client';

export default class ClientContact implements PrismaClientContact {
  id: string;

  name: string | null;

  sector: string | null;

  email: string | null;

  phone: string | null;

  client_id: string;

  created_at: Date;

  updated_at: Date;
}
