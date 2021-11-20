import { User } from '.prisma/client';

import CreateUserDTO from '../dtos/CreateUser.dto';

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
}

export default IUserRepository;
