import { CreateProfilesController } from '@/main/controllers/profiles'
import { CreateProfilesService } from '@/services/profiles'

import { mockProfile } from '@/tests/mocks'

describe('CreateProfilesController', () => {
  const profilesService = {} as CreateProfilesService
  const profilesController = new CreateProfilesController(profilesService)
  const req: any = { body: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockProfile
  })

  describe('handle', () => {
    it('should be able to create new profile', async () => {
      profilesService.execute = jest.fn()

      await profilesController.handle(req, res)

      expect(profilesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create a new profile and must return some server error ', async () => {
      const error = new Error('some-error')
      profilesService.execute = jest.fn().mockRejectedValue(error)

      await profilesController.handle(req, res)

      expect(profilesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
