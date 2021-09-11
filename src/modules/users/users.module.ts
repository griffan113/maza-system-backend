import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnsureAuthenticated } from './infra/http/guards/EnsureAuthenticated.guard';
import User from './infra/typeorm/entities/User.entity';
import TypeOrmUserRepository from './infra/typeorm/repositories/UserRepository';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from './services/CreateUser.service';
import SessionsController from './infra/http/controllers/Sessions.controller';
import UsersController from './infra/http/controllers/User.controller';
import AuthenticateUserService from './services/AuthenticateUser.service';

@Module({
  controllers: [UsersController, SessionsController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    { provide: 'TypeOrmUserRepository', useClass: TypeOrmUserRepository },
    { provide: 'HashProvider', useClass: BCryptHashProvider },
    { provide: 'EnsureAuthenticated', useClass: EnsureAuthenticated },
    { provide: 'CreateUserService', useClass: CreateUserService },
    { provide: 'AuthenticateUserService', useClass: AuthenticateUserService },
  ],
})
class UsersModule {}
export default UsersModule;
