import { v4 as uuid } from 'uuid';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IUserRepository from '../../repositories/IUserRepository';
import User from '@modules/users/infra/prisma/models/User';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }

  public async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();

    // Pushes all passaded properties to the user passed in the first param
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async delete(id: string): Promise<User> {
    const findIndex = this.users.findIndex((findUser) => findUser.id === id);

    this.users.splice(findIndex, 1);

    return this.users[findIndex];
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
