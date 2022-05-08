import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'is_admin';

export const SetAdminRoute = () => SetMetadata(IS_ADMIN_KEY, true);
