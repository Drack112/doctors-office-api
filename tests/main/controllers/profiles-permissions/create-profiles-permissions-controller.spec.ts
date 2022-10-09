import { CreateProfilesPermissionsController } from '@/main/controllers/profiles-permissions'
import { CreateProfilesPermissionsService } from '@/services/profiles-permissions'

import { mockProfilePermission } from '@/tests/mocks'

describe('CreateProfilesPermissionsController', () => {
  const profilesPermissionsService = {} as CreateProfilesPermissionsService
  const profilesPermissionsController = new CreateProfilesPermissionsController(profilesPermissionsService)
  const req: any = { body: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockProfilePermission
  })

  describe('handle', () => {
    it('should be able to create new profile-permission', async () => {
      profilesPermissionsService.execute = jest.fn()

      await profilesPermissionsController.handle(req, res)

      expect(profilesPermissionsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create a new profile-permission and must return some server error ', async () => {
      const error = new Error('some-error')
      profilesPermissionsService.execute = jest.fn().mockRejectedValue(error)

      await profilesPermissionsController.handle(req, res)

      expect(profilesPermissionsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
