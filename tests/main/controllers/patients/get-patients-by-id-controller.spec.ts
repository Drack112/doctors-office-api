import { RequestError } from '@/errors'
import { GetPatientsByIdController } from '@/main/controllers/patients'
import { GetPatientsByIdService } from '@/services/patients'
import { patientModel } from '@/tests/mocks'

describe('GetPatientsByIdController', () => {
  const service = {} as GetPatientsByIdService
  const controller = new GetPatientsByIdController(service)
  const req: any = { params: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { id: 'any-patient-id' }
  })

  describe('handle', () => {
    it('should be able to get a patient', async () => {
      service.execute = jest.fn().mockResolvedValue([patientModel])

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [patientModel])
    })

    it('should not be able to get a doctor due some request trouble', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a doctor due server error', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
