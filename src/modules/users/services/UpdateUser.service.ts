import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '.prisma/client';

import UpdateUserDTO from '../dtos/UpdateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

@Injectable()
export default class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    email,
    password,
    name,
    old_password,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (email) {
      const userWithUpdatedEmail = await this.userRepository.findByEmail(email);
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new BadRequestException('Email alread in use');
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new BadRequestException(
        'You need to inform the old password to set a new pssword'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );
      if (!checkOldPassword) {
        throw new BadRequestException('The old password is wrong');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (name) user.name = name;

    await this.userRepository.update(user);

    return user;
  }
}
