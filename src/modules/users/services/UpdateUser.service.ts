import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import UpdateUserDTO from '@modules/users/dtos/UpdateUserDTO';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';

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
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (email) {
      const userWithUpdatedEmail = await this.userRepository.findByEmail(email);
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new BadRequestException('E-mail já está em uso.');
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new BadRequestException(
        'Você precisa informar a sua senha antiga para criar uma nova senha.'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );
      if (!checkOldPassword) {
        throw new BadRequestException('A senha antiga está incorreta');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (name) user.name = name;

    await this.userRepository.update(user);

    return user;
  }
}
