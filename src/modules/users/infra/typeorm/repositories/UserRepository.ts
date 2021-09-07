import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUser.dto';
import User from '../entities/User.entity';

@Injectable()
class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private ormRepository: Repository<User>
  ) {}

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default TypeOrmUserRepository;
