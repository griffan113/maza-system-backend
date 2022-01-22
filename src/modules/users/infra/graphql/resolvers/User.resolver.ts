import {
  Inject,
  ParseUUIDPipe,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@shared/infra/graphql/graphql';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import CreateUserService from '@modules/users/services/CreateUser.service';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import UpdateUserDTO from '@modules/users/dtos/UpdateUserDTO';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import DeleteUserService from '@modules/users/services/DeleteUser.service';
import { EnsureAuthenticated } from '../guards/EnsureAuthenticated.guard';

@UseGuards(EnsureAuthenticated)
@Resolver(() => User)
export default class UserResolver {
  constructor(
    @Inject('CreateUserService')
    private readonly createUserService: CreateUserService,

    @Inject('IndexUsersService')
    private readonly indexUsersService: IndexUsersService,

    @Inject('UpdateUserService')
    private readonly updateUserService: UpdateUserService,

    @Inject('DeleteUserService')
    private readonly deleteUserService: DeleteUserService
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  public async create(
    @Args('createUserDTO', ValidationPipe)
    createUserDTO: CreateUserDTO
  ) {
    const createUser = await this.createUserService.execute(createUserDTO);

    return createUser;
  }

  @Query(() => [User], { name: 'indexUsers' })
  public async index() {
    const indexUsers = await this.indexUsersService.execute();

    return indexUsers;
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async update(
    @Args('updateUserDTO', ValidationPipe)
    updateUserDTO: UpdateUserDTO
  ) {
    const updateUser = await this.updateUserService.execute(updateUserDTO);

    return updateUser;
  }

  /*   @Mutation(() => User, { name: 'deleteUser' })
  public async delete(
    @Args('id', ParseUUIDPipe)
    id: string
  ) {
    const deleteUser = await this.deleteUserService.execute({ id });

    return deleteUser;
  } */
}
