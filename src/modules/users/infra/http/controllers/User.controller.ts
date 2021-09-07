import CreateUserDTO from '@modules/users/dtos/CreateUser.dto';
import CreateUserService from '@modules/users/services/CreateUser.service';
import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';

@Controller('users')
class UsersController {
  constructor(
    @Inject('CreateUserService') private readonly createUser: CreateUserService
  ) {}

  @Post('/')
  public async create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    return this.createUser.execute(createUserDTO);
  }
}

export default UsersController;
