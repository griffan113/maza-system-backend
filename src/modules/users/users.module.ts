import { Module } from '@nestjs/common';

import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';

@Module({
  providers: [{ provide: 'BCryptHashProvider', useClass: BCryptHashProvider }],
})
class UsersModule {}
export default UsersModule;
