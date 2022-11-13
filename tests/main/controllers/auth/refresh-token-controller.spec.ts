import { RequestError } from '@/errors'
import { RefreshTokenController } from '@/main/controllers/auth'
import { RefreshTokenService } from '@/services/auth'

describe('RefreshTokenController', () => {
  const refreshToken = 'any-refresh-token'
  const service = {} as RefreshTokenService
  const controller = new RefreshTokenController(service)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.userId = 'any-user-id'
  })

  describe('handle', () => {
    it('should be able to generate refresh_token successfully', async () => {
      service.execute = jest.fn().mockResolvedValue(refreshToken)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.userId)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, { refresh_token: refreshToken })
    })

    it('should not be able to generate refresh_token if some request error occurs', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.userId)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to generate refresh_token if some server error occurs', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.userId)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
