import { RequestError } from '@/errors'
import { GetAdminsByIdController } from '@/main/controllers/admins'
import { GetAdminsByIdService } from '@/services/admins'
import { adminModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetAdminsByIdController', () => {
  const adminsByIdService = {} as GetAdminsByIdService
  const adminsByIdController = new GetAdminsByIdController(adminsByIdService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get a admin', async () => {
      adminsByIdService.execute = jest.fn().mockResolvedValue([adminModel])

      await adminsByIdController.handle(req, res)

      expect(adminsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [adminModel])
    })

    it('should not be able to get a admin due some request trouble', async () => {
      const error = new RequestError('some-error')
      adminsByIdService.execute = jest.fn().mockRejectedValue(error)

      await adminsByIdController.handle(req, res)

      expect(adminsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a admin due server error', async () => {
      const error = new Error('some-error')
      adminsByIdService.execute = jest.fn().mockRejectedValue(error)

      await adminsByIdController.handle(req, res)

      expect(adminsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
