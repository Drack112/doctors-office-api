import { RequestError } from '@/errors'
import { GetPatientsByIdController } from '@/main/controllers/patients'
import { GetPatientsByIdService } from '@/services/patients'
import { doctorModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetPatientsByIdController', () => {
  const patientsByIdService = {} as GetPatientsByIdService
  const patientsByIdController = new GetPatientsByIdController(patientsByIdService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get a doctor', async () => {
      patientsByIdService.execute = jest.fn().mockResolvedValue([doctorModel])

      await patientsByIdController.handle(req, res)

      expect(patientsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [doctorModel])
    })

    it('should not be able to get a doctor due some request trouble', async () => {
      const error = new RequestError('some-error')
      patientsByIdService.execute = jest.fn().mockRejectedValue(error)

      await patientsByIdController.handle(req, res)

      expect(patientsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a doctor due server error', async () => {
      const error = new Error('some-error')
      patientsByIdService.execute = jest.fn().mockRejectedValue(error)

      await patientsByIdController.handle(req, res)

      expect(patientsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
