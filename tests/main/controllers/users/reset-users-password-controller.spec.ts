import { RequestError } from '@/errors'
import { ResetUsersPasswordController } from '@/main/controllers/users'
import { ResetUsersPasswordService } from '@/services/users'

describe('UpdateUsersPasswordController', () => {
  const service = {} as ResetUsersPasswordService
  const controller = new ResetUsersPasswordController(service)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = { password: 'any-password' }
    req.query = { token: 'any-token' }
  })

  describe('handle', () => {
    it('should be able to reset user password', async () => {
      service.execute = jest.fn()

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.query.token, req.body.password)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to reset user password and return some request error', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.query.token, req.body.password)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to reset user password and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.query.token, req.body.password)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
