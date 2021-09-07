import { Module } from '@nestjs/common';
import { EnsureAuthenticated } from './infra/http/guards/EnsureAuthenticated.guard';

import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';

@Module({
  providers: [
    { provide: 'BCryptHashProvider', useClass: BCryptHashProvider },
    { provide: 'EnsureAuthenticated', useClass: EnsureAuthenticated },
  ],
})
class UsersModule {}
export default UsersModule;
