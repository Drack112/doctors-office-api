import { RequestError } from '@/errors'
import { SendPasswordRecoveryTokenController } from '@/main/controllers/users'
import { SendPasswordRecoveryTokenService } from '@/services/users'

describe('UpdateUsersPasswordController', () => {
  const service = {} as SendPasswordRecoveryTokenService
  const controller = new SendPasswordRecoveryTokenController(service)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = { email: 'any-email' }
  })

  describe('handle', () => {
    it('should be able to send password recovery token mail', async () => {
      service.execute = jest.fn()

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body.email)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to send password recovery token mail and return some request error', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body.email)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to send password recovery token mail and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body.email)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
