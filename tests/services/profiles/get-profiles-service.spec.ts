import { ProfilesRepository } from '@/infra/repositories'
import { GetProfilesService } from '@/services/profiles'

import { profilesResponse } from '@/tests/mocks'

describe('GetProfilesService', () => {
  const profilesRepository = {} as ProfilesRepository
  const service = new GetProfilesService(profilesRepository)

  describe('execute', () => {
    beforeAll(() => {
      profilesRepository.get = jest.fn().mockResolvedValue(profilesResponse)
    })

    it('should be able to get profiles list', async () => {
      const response = await service.execute()

      expect(response).toStrictEqual(profilesResponse)
      expect(profilesRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
