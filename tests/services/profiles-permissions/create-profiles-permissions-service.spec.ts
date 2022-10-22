import { ProfilesPermissionsRepository } from '@/infra/repositories'
import { CreateProfilesPermissionsService } from '@/services/profiles-permissions'

import { mockProfilePermission, profilePermissionModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateProfilesPermissionsService', () => {
  const profilesPermissionsRepository = {} as ProfilesPermissionsRepository
  const service = new CreateProfilesPermissionsService(profilesPermissionsRepository)

  describe('execute', () => {
    beforeAll(() => {
      profilesPermissionsRepository.create = jest.fn()
    })

    it('should be able to create new profile-permission successfully', async () => {
      await service.execute(mockProfilePermission)

      expect(profilesPermissionsRepository.create).toHaveBeenNthCalledWith(1, profilePermissionModel)
    })
  })
})
