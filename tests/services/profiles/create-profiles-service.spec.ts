import { ProfilesRepository } from '@/infra/repositories'
import { CreateProfilesService } from '@/services/profiles'

import { mockProfile, profileModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateProfilesService', () => {
  const profilesRepository = {} as ProfilesRepository
  const profilesService = new CreateProfilesService(profilesRepository)

  describe('execute', () => {
    beforeAll(() => {
      profilesRepository.create = jest.fn()
    })

    it('should be able to create new profile successfully', async () => {
      await profilesService.execute(mockProfile)

      expect(profilesRepository.create).toHaveBeenNthCalledWith(1, profileModel)
    })
  })
})
