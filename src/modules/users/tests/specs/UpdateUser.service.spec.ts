import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mockUpdateUserService, createUserData } from '../mocks';

describe('updateUser', () => {
  it('should be able to update a user ', async () => {
    const { fakeUserRepository, updateUserService, fakeHashProvider } =
      mockUpdateUserService();

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create(
      createUserData({ email: 'jj2@gmail.com' })
    );
    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      email: 'jj2@email.com',
      name: 'user2',
      password: '123321',
      old_password: '123456',
    });

    expect(updatedUser.name).toBe('user2');
    expect(generateHash).toHaveBeenCalledWith('123321');
    expect(updatedUser.name).toBe('user2');
  });

  it('should not be able to update a non existent user ', async () => {
    const { updateUserService } = mockUpdateUserService();
    await expect(
      updateUserService.execute({
        user_id: 'non-existent-user-id',
        email: 'jj@email.com',
      })
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able to update email with an existing email from other user ', async () => {
    const { fakeUserRepository, updateUserService } = mockUpdateUserService();
    await fakeUserRepository.create(createUserData({}));

    const user2 = await fakeUserRepository.create(
      createUserData({ email: 'jj2@gmail.com' })
    );

    await expect(
      updateUserService.execute({
        user_id: user2.id,
        email: 'jj@email.com',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be not able to update password without the old password', async () => {
    const { fakeUserRepository, updateUserService } = mockUpdateUserService();
    const user = await fakeUserRepository.create(createUserData({}));

    await expect(
      updateUserService.execute({
        user_id: user.id,
        email: 'jj@email.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be not able to update password with wrong old password', async () => {
    const { fakeUserRepository, updateUserService } = mockUpdateUserService();
    const user = await fakeUserRepository.create(createUserData({}));

    await expect(
      updateUserService.execute({
        user_id: user.id,
        email: 'jj@email.com',
        password: '1231j23',
        old_password: '123123',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
