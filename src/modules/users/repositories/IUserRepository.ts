import { User } from '@prisma/client';

import CreateUserDTO from '../dtos/CreateUserDTO';

interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: CreateUserDTO): Promise<User>;
  delete(id: string): Promise<User>;
}

export default IUserRepository;
