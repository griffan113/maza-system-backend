import { UseGuards } from '@nestjs/common';

import { EnsureAuthenticated } from '../guards/EnsureAuthenticated.guard';

export const SetPrivateRoute = () => UseGuards(EnsureAuthenticated);
