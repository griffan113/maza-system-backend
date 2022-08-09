import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/prisma/models/User';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const { name, email, password, role } = createUserDTO;

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new BadRequestException('E-mail já usado.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  }
}

export default CreateUserService;
