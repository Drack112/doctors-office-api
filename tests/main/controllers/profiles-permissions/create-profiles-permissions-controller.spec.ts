import { CreateProfilesPermissionsController } from '@/main/controllers/profiles-permissions'
import { CreateProfilesPermissionsService } from '@/services/profiles-permissions'

import { mockProfilePermission } from '@/tests/mocks'

describe('CreateProfilesPermissionsController', () => {
  const service = {} as CreateProfilesPermissionsService
  const controller = new CreateProfilesPermissionsController(service)
  const req: any = { body: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockProfilePermission
  })

  describe('handle', () => {
    it('should be able to create new profile-permission', async () => {
      service.execute = jest.fn()

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create a new profile-permission and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
