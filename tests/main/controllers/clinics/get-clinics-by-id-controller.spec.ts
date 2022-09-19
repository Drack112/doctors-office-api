import { RequestError } from '@/errors'
import { GetClinicsByIdController } from '@/main/controllers/clinics'
import { GetClinicsByIdService } from '@/services/clinics'
import { clinicModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetClinicsByIdController', () => {
  const clinicsByIdService = {} as GetClinicsByIdService
  const clinicsByIdController = new GetClinicsByIdController(clinicsByIdService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get a clinic', async () => {
      clinicsByIdService.execute = jest.fn().mockResolvedValue([clinicModel])

      await clinicsByIdController.handle(req, res)

      expect(clinicsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [clinicModel])
    })

    it('should not be able to get a clinic due some request trouble', async () => {
      const error = new RequestError('some-error')
      clinicsByIdService.execute = jest.fn().mockRejectedValue(error)

      await clinicsByIdController.handle(req, res)

      expect(clinicsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a clinic due server error', async () => {
      const error = new Error('some-error')
      clinicsByIdService.execute = jest.fn().mockRejectedValue(error)

      await clinicsByIdController.handle(req, res)

      expect(clinicsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
