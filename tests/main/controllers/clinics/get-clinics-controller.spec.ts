import { GetClinicsController } from '@/main/controllers/clinics'
import { GetClinicsService } from '@/services/clinics'
import { clinicModel } from '@/tests/mocks'

describe('GetClinicsController', () => {
  const service = {} as GetClinicsService
  const controller = new GetClinicsController(service)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  describe('handle', () => {
    it('should be able to get list of clinics', async () => {
      service.execute = jest.fn().mockResolvedValue([clinicModel])

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [clinicModel])
    })

    it('should not be able to get list of clinics due some server error', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
