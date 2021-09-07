import { v4 as uuid } from 'uuid';

import CreateUserDTO from '@modules/users/dtos/CreateUser.dto';
import User from '../../infra/typeorm/entities/User.entity';
import IUserRepository from '../IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();

    // Pushes all passaded properties to the user passed in the first param
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
