import { GetClinicsController } from '@/main/controllers/clinics'
import { GetClinicsService } from '@/services/clinics'
import { clinicModel } from '@/tests/mocks'

describe('GetClinicsController', () => {
  const clinicsService = {} as GetClinicsService
  const clinicsController = new GetClinicsController(clinicsService)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  describe('handle', () => {
    it('should be able to get list of clinics', async () => {
      clinicsService.execute = jest.fn().mockResolvedValue([clinicModel])

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [clinicModel])
    })

    it('should not be able to get list of clinics due some server error', async () => {
      const error = new Error('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
