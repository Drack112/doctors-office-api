import { RequestError } from '@/errors'
import { LoginController } from '@/main/controllers/auth'
import { LoginService } from '@/services/auth'
import { mockLogin } from '@/tests/mocks'

describe('LoginController', () => {
  const loginResponse = { access_token: 'any-generated-token' }
  const service = {} as LoginService
  const controller = new LoginController(service)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockLogin
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to login successfully', async () => {
      service.execute = jest.fn().mockResolvedValue(loginResponse)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, loginResponse)
    })

    it('should not be able to login if some request error occurs', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to login if some server error occurs', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
