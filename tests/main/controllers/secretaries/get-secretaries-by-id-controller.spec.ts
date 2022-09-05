import { RequestError } from '@/errors'
import { GetSecretariesByIdController } from '@/main/controllers/secretaries'
import { GetSecretariesByIdService } from '@/services/secretaries'
import { doctorModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetSecretariesByIdController', () => {
  const secretariesByIdService = {} as GetSecretariesByIdService
  const secretariesByIdController = new GetSecretariesByIdController(secretariesByIdService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get a secretary', async () => {
      secretariesByIdService.execute = jest.fn().mockResolvedValue([doctorModel])

      await secretariesByIdController.handle(req, res)

      expect(secretariesByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [doctorModel])
    })

    it('should not be able to get a secretary due some request trouble', async () => {
      const error = new RequestError('some-error')
      secretariesByIdService.execute = jest.fn().mockRejectedValue(error)

      await secretariesByIdController.handle(req, res)

      expect(secretariesByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a secretary due server error', async () => {
      const error = new Error('some-error')
      secretariesByIdService.execute = jest.fn().mockRejectedValue(error)

      await secretariesByIdController.handle(req, res)

      expect(secretariesByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
