import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/prisma/models/User';

@Injectable()
class AuthenticateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }): Promise<{
    user: User;
    token: string;
  }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Credenciais incorretas.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new BadRequestException('Credenciais incorretas.');
    }

    const token = sign({ role: user.role }, authConfig.jwt.secret, {
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
