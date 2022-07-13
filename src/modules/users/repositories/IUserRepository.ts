import { User } from '@prisma/client';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';

interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAllUsers(data: PaginationWithFiltersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: CreateUserDTO): Promise<User>;
  delete(id: string): Promise<User>;
}

export default IUserRepository;
