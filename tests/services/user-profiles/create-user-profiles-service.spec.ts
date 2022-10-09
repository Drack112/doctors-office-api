import { UsersProfilesRepository } from '@/infra/repositories'
import { CreateUsersProfilesService } from '@/services/users-profiles'

import { mockUserProfile, userProfileModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateUsersProfilesService', () => {
  const usersProfilesRepository = {} as UsersProfilesRepository
  const usersProfilesService = new CreateUsersProfilesService(usersProfilesRepository)

  describe('execute', () => {
    beforeAll(() => {
      usersProfilesRepository.create = jest.fn()
    })

    it('should be able to create new user-profile successfully', async () => {
      await usersProfilesService.execute(mockUserProfile)

      expect(usersProfilesRepository.create).toHaveBeenNthCalledWith(1, userProfileModel)
    })
  })
})
