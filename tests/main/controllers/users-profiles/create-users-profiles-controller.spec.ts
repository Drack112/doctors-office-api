import { CreateUsersProfilesController } from '@/main/controllers/users-profiles'
import { CreateUsersProfilesService } from '@/services/users-profiles'

import { mockProfile } from '@/tests/mocks'

describe('CreateUsersProfilesController', () => {
  const usersProfilesService = {} as CreateUsersProfilesService
  const usersProfilesController = new CreateUsersProfilesController(usersProfilesService)
  const req: any = { body: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockProfile
  })

  describe('handle', () => {
    it('should be able to create new user-profile', async () => {
      usersProfilesService.execute = jest.fn()

      await usersProfilesController.handle(req, res)

      expect(usersProfilesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create a new user-profile and must return some server error ', async () => {
      const error = new Error('some-error')
      usersProfilesService.execute = jest.fn().mockRejectedValue(error)

      await usersProfilesController.handle(req, res)

      expect(usersProfilesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
