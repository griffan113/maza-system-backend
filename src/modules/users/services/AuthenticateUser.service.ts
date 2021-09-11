import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import IUserRepository from '../repositories/IUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import User from '../infra/typeorm/entities/User.entity';

@Injectable()
class AuthenticateUserService {
  constructor(
    @Inject('TypeOrmUserRepository')
    private readonly usersRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: FakeHashProvider
  ) {}

  public async execute({ email, password }): Promise<{
    user: User;
    token: string;
  }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Incorrect email/password combination.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new BadRequestException('Incorrect email/password combination.');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
