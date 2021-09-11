import CreateUserDTO from '@modules/users/dtos/CreateUser.dto';
import CreateUserService from '@modules/users/services/CreateUser.service';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EnsureAuthenticated } from '../guards/EnsureAuthenticated.guard';

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
