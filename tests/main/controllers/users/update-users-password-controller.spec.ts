import { RequestError } from '@/errors'
import { UpdateUsersPasswordController } from '@/main/controllers/users'
import { UpdateUsersPasswordService } from '@/services/users'
import { mockUser } from '@/tests/mocks'

describe('UpdateUsersPasswordController', () => {
  const service = {} as UpdateUsersPasswordService
  const controller = new UpdateUsersPasswordController(service)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockUser
  })

  describe('handle', () => {
    it('should be able to update user password', async () => {
      service.execute = jest.fn()

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update user password', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new user and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
