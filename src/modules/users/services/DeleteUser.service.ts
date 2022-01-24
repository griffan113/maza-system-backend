import { User } from '.prisma/client';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  currentUserId: string;
  id: string;
}

@Injectable()
export default class DeleteUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ id, currentUserId }: IRequest): Promise<User> {
    if (currentUserId === id)
      throw new NotFoundException('Você não pode se deletar!');

    const findUser = await this.userRepository.findById(id);

    if (!findUser) throw new NotFoundException('Usuário não encontrado');

    const deleteUser = await this.userRepository.delete(id);

    delete deleteUser.password;

    return deleteUser;
  }
}
