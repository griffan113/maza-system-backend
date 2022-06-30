import { User as PrismaUser, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';

export default class User implements PrismaUser {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  role: UserRole;

  created_at: Date;

  updated_at: Date;
}
