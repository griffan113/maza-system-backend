import { User } from '.prisma/client';

import CreateUserDTO from '../dtos/CreateUser.dto';

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findAllUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: CreateUserDTO): Promise<User>;
  delete(id: string): Promise<User>;
}

export default IUserRepository;
