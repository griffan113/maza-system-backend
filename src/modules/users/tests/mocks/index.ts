import FakeUserRepository from '@modules/users/tests/fakeRepositories/FakeUserRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUser.service';
import CreateUserService from '@modules/users/services/CreateUser.service';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

interface ICreateUserData {
  email?: string;
  password?: string;
  name?: string;
}

export const mockAuthenticateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const authenticateUserService = new AuthenticateUserService(
    fakeUserRepository,
    fakeHashProvider
  );
  return { authenticateUserService, fakeUserRepository };
};

export const mockCreateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const createUserService = new CreateUserService(
    fakeUserRepository,
    fakeHashProvider
  );
  return createUserService;
};

export const mockIndexUsersService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const indexUsersService = new IndexUsersService(fakeUserRepository);
  return { indexUsersService, fakeUserRepository };
};

export const mockUpdateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const updateUserService = new UpdateUserService(
    fakeUserRepository,
    fakeHashProvider
  );

  return { fakeUserRepository, updateUserService, fakeHashProvider };
};

export const createUserData = ({ email, name, password }: ICreateUserData) => ({
  email: email || 'jj@email.com',
  password: password || '123456',
  name: name || 'username',
});
