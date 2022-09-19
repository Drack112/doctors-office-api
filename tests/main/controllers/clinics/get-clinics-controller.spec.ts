import { GetClinicsController } from '@/main/controllers/clinics'
import { GetClinicsService } from '@/services/clinics'
import { clinicModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetClinicsController', () => {
  const clinicsService = {} as GetClinicsService
  const clinicsController = new GetClinicsController(clinicsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get list of clinics', async () => {
      clinicsService.execute = jest.fn().mockResolvedValue([clinicModel])

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [clinicModel])
    })

    it('should not be able to get list of clinics', async () => {
      const error = new Error('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
