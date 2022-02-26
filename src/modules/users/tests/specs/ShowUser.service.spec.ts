import { NotFoundException } from '@nestjs/common';

import { mockShowUserService, createUserData } from '../mocks';

describe('ShowUser', () => {
  it('should be able to show an user', async () => {
    const { fakeUserRepository, showUserService } = mockShowUserService();
    const user = await fakeUserRepository.create(createUserData({}));

    const showUser = await showUserService.execute({ user_id: user.id });

    expect(showUser.id).toBe(user.id);
  });

  it('should not be able to show a non-exitent user', async () => {
    const { showUserService } = mockShowUserService();
    expect(
      showUserService.execute({ user_id: 'non-exitent-user_id' })
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
