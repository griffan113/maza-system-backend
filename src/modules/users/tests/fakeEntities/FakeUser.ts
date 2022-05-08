import { User } from '.prisma/client';

export class FakeUser implements User {
  id: string;
  email: string;
  is_admin: boolean;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
