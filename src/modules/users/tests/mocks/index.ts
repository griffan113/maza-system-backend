import { UserRole } from '@prisma/client';

import FakeUserRepository from '@modules/users/tests/fakeRepositories/FakeUserRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUser.service';
import CreateUserService from '@modules/users/services/CreateUser.service';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import DeleteUserService from '@modules/users/services/DeleteUser.service';
import ShowUserService from '@modules/users/services/ShowUser.service';

interface ICreateUserData {
  email?: string;
  password?: string;
  name?: string;
  role?: UserRole;
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

export const mockDeleteUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const deleteUserService = new DeleteUserService(fakeUserRepository);
  return { fakeUserRepository, deleteUserService };
};

export const mockShowUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const showUserService = new ShowUserService(fakeUserRepository);
  return { showUserService, fakeUserRepository };
};

export const createUserData = ({ email, name, password }: ICreateUserData) => ({
  email: email || 'jj@email.com',
  password: password || '123456',
  name: name || 'username',
});
