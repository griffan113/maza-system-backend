import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import CreateSessionDTO from '@modules/users/dtos/CreateSession.dto';
import AuthenticateUserService from '@modules/users/services/AuthenticateUser.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('sessions')
class SessionsController {
  constructor(
    @Inject('AuthenticateUserService')
    private readonly authenticateUserService: AuthenticateUserService
  ) {}

  @Post('/')
  public async create(
    @Body(ValidationPipe) createSessionDTO: CreateSessionDTO
  ) {
    const authenticateUser =
      this.authenticateUserService.execute(createSessionDTO);

    return authenticateUser;
  }
}

export default SessionsController;
