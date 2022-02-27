import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@prisma/client';

interface IRequest {
  user_id: string;
}

@Injectable()
class ShowUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}

export default ShowUserService;
