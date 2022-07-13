import { User } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

import PaginationWithFiltersDTO from '@shared/dtos/PaginationWithFilters.dto';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@Injectable()
export default class IndexUsersService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    pagination,
    filter,
  }: PaginationWithFiltersDTO): Promise<User[]> {
    const users = await this.userRepository.findAllUsers({
      pagination,
      filter,
    });

    return users;
  }
}
