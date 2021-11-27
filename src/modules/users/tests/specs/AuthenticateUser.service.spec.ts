import { createUserData, mockAuthenticateUserService } from '../mocks';

import { BadRequestException } from '@nestjs/common';

describe('authUser', () => {
  it('should be able to auth', async () => {
    const { authenticateUserService, fakeUserRepository } =
      mockAuthenticateUserService();
    await fakeUserRepository.create(createUserData({}));

    const response = await authenticateUserService.execute({
      email: 'jj@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to login with incorrect email', async () => {
    const { authenticateUserService, fakeUserRepository } =
      mockAuthenticateUserService();
    await fakeUserRepository.create(createUserData({}));

    await expect(
      authenticateUserService.execute({
        email: 'jjj@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to login with incorrect password', async () => {
    const { authenticateUserService, fakeUserRepository } =
      mockAuthenticateUserService();
    await fakeUserRepository.create(createUserData({}));

    await expect(
      authenticateUserService.execute({
        email: 'jj@email.com',
        password: '1234564',
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
