import {
  createUserData,
  mockDeleteUserService,
} from '@modules/users/tests/mocks';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUser', () => {
  it('should be able to delete an user', async () => {
    const { deleteUserService, fakeUserRepository } = mockDeleteUserService();

    const user = await fakeUserRepository.create(createUserData({}));

    const currentUser = await fakeUserRepository.create(createUserData({}));

    const deleteUser = await deleteUserService.execute({
      id: user.id,
      currentUserId: currentUser.id,
    });

    expect(deleteUser).toHaveProperty('id');
  });

  it('should return an error if the user does not exist', async () => {
    const { deleteUserService, fakeUserRepository } = mockDeleteUserService();

    const currentUser = await fakeUserRepository.create(createUserData({}));

    await expect(
      deleteUserService.execute({
        id: 'non-existent-user-id',
        currentUserId: currentUser.id,
      })
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should return an error if the user tries to delete himself', async () => {
    const { deleteUserService, fakeUserRepository } = mockDeleteUserService();

    const currentUser = await fakeUserRepository.create(createUserData({}));

    await expect(
      deleteUserService.execute({
        id: currentUser.id,
        currentUserId: currentUser.id,
      })
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
