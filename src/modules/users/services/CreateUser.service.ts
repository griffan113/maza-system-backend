import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import CreateUserDTO from '../dtos/CreateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(createUserDTO: CreateUserDTO) {
    const { name, email, password, is_admin } = createUserDTO;

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new BadRequestException('E-mail já usado.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      is_admin,
    });

    return user;
  }
}

export default CreateUserService;
