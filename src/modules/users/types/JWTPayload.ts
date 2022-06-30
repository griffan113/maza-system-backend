import { UserRole } from '@prisma/client';

export type JWTPayload = {
  iat: number;
  exp: number;
  sub: string;
  role: UserRole;
};
