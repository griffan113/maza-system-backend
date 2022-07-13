import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@prisma/client';

export const REQUIRED_ROLES = 'roles';

export const SetRequiredRoles = (roles: UserRole[]) =>
  SetMetadata(REQUIRED_ROLES, roles);
