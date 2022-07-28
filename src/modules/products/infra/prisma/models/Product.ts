import { Product as PrismaProduct } from '@prisma/client';

export default class Product implements PrismaProduct {
  id: string;

  name: string;

  teeth_number: number;

  diameter: number;

  price: number;

  created_at: Date;

  updated_at: Date;
}
