import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/services/Prisma.service';
import { EnsureAuthenticated } from './infra/http/guards/EnsureAuthenticated.guard';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from './services/CreateUser.service';
import SessionsController from './infra/http/controllers/Sessions.controller';
import UsersController from './infra/http/controllers/User.controller';
import AuthenticateUserService from './services/AuthenticateUser.service';
import UserRepository from './infra/prisma/repositories/UserRepository';
import UserResolver from './infra/graphql/resolvers/User.resolver';
import IndexUsersService from './services/IndexUsers.service';
import UpdateUserService from './services/UpdateUser.service';

@Module({
  controllers: [UsersController, SessionsController],
  providers: [
    PrismaService,
    UserResolver,
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'HashProvider', useClass: BCryptHashProvider },
    { provide: 'EnsureAuthenticated', useClass: EnsureAuthenticated },
    { provide: 'CreateUserService', useClass: CreateUserService },
    { provide: 'IndexUsersService', useClass: IndexUsersService },
    { provide: 'AuthenticateUserService', useClass: AuthenticateUserService },
    { provide: 'UpdateUserService', useClass: UpdateUserService },
  ],
})
export default class UsersModule {}
