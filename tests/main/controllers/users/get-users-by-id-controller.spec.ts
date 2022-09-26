import { RequestError } from '@/errors'
import { GetUsersByIdController } from '@/main/controllers/users'
import { GetUsersByIdService } from '@/services/users'
import { userModel } from '@/tests/mocks'

describe('GetUsersByIdController', () => {
  const usersByIdService = {} as GetUsersByIdService
  const usersByIdController = new GetUsersByIdController(usersByIdService)
  const req: any = { params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to get a user', async () => {
      usersByIdService.execute = jest.fn().mockResolvedValue([userModel])

      await usersByIdController.handle(req, res)

      expect(usersByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [userModel])
    })

    it('should not be able to get a user due some request trouble', async () => {
      const error = new RequestError('some-error')
      usersByIdService.execute = jest.fn().mockRejectedValue(error)

      await usersByIdController.handle(req, res)

      expect(usersByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a user due server error', async () => {
      const error = new Error('some-error')
      usersByIdService.execute = jest.fn().mockRejectedValue(error)

      await usersByIdController.handle(req, res)

      expect(usersByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
