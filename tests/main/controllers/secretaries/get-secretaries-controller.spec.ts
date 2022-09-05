import { GetSecretariesController } from '@/main/controllers/secretaries'
import { GetSecretariesService } from '@/services/secretaries'
import { patientModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetSecretariesController', () => {
  const secretariesService = {} as GetSecretariesService
  const secretariesController = new GetSecretariesController(secretariesService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get list of secretaries', async () => {
      secretariesService.execute = jest.fn().mockResolvedValue([patientModel])

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [patientModel])
    })

    it('should not be able to get list of secretaries', async () => {
      const error = new Error('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
