import CreateUserDTO from '../dtos/CreateUser.dto';
import User from '../infra/typeorm/entities/User.entity';

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export default IUserRepository;
