import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import CreateUserService from '@modules/users/services/CreateUser.service';
import { EnsureAuthenticated } from '../guards/EnsureAuthenticated.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(EnsureAuthenticated)
@Controller('users')
class UsersController {
  constructor(
    @Inject('CreateUserService')
    private readonly createUserService: CreateUserService
  ) {}

  @Post('/')
  public async create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    const createUser = this.createUserService.execute(createUserDTO);

    return createUser;
  }
}

export default UsersController;
