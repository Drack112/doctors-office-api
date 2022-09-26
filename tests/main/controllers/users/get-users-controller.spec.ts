import { GetUsersController } from '@/main/controllers/users'
import { GetUsersService } from '@/services/users'
import { userModel } from '@/tests/mocks'

describe('GetUsersController', () => {
  const usersService = {} as GetUsersService
  const usersController = new GetUsersController(usersService)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to get list of users', async () => {
      usersService.execute = jest.fn().mockResolvedValue([userModel])

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [userModel])
    })

    it('should not be able to get list of users', async () => {
      const error = new Error('some-error')
      usersService.execute = jest.fn().mockRejectedValue(error)

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
