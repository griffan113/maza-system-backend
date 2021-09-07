import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import CreateUserDTO from '../dtos/CreateUser.dto';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('TypeOrmUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(createUserDTO: CreateUserDTO) {
    const { name, email, password } = createUserDTO;

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new BadRequestException('Email already used');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to save user on database: ' + error
      );
    }
  }
}

export default CreateUserService;
