import { mockIndexUsersService, createUserData } from '../mocks';

describe('IndexUsers', () => {
  it('should be able to index users', async () => {
    const { fakeUserRepository, indexUsersService } = mockIndexUsersService();
    await fakeUserRepository.create(createUserData({}));

    await fakeUserRepository.create(createUserData({ email: 'jj2@fmail.com' }));

    const users = await indexUsersService.execute();

    expect(users?.length).toBe(2);
  });
});
