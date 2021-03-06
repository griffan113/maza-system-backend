import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/services/Prisma.service';
import { EnsureAuthenticated } from './infra/http/guards/EnsureAuthenticated.guard';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUser.service';
import SessionsController from '@modules/users/infra/http/controllers/Sessions.controller';
import AuthenticateUserService from '@modules/users/services/AuthenticateUser.service';
import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import UserResolver from '@modules/users/infra/graphql/resolvers/User.resolver';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import DeleteUserService from '@modules/users/services/DeleteUser.service';
import ShowUserService from '@modules/users/services/ShowUser.service';

@Module({
  controllers: [SessionsController],
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
    { provide: 'DeleteUserService', useClass: DeleteUserService },
    { provide: 'ShowUserService', useClass: ShowUserService },
  ],
})
export default class UsersModule {}
