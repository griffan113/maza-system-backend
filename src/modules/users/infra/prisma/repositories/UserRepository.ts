import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import { PrismaService } from '@shared/services/Prisma.service';
import CreateUserDTO from '@modules/users/dtos/CreateUser.dto';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.user.findUnique({ where: { id } });

    return user;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.user.findMany();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.user.findUnique({ where: { email } });

    return user;
  }

  public async delete(id: string): Promise<User> {
    const deleteUser = await this.ormRepository.user.delete({ where: { id } });

    return deleteUser;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const { email, name, password } = userData;

    const user = await this.ormRepository.user.create({
      data: { email, name, password },
    });

    return user;
  }

  public async update(user: User): Promise<User> {
    const { id, email, password, name } = user;

    const updateUser = await this.ormRepository.user.update({
      data: { email, password, name },
      where: { id },
    });

    return updateUser;
  }
}
