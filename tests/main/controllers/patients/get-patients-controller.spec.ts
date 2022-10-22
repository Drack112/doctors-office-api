import { GetPatientsController } from '@/main/controllers/patients'
import { GetPatientsService } from '@/services/patients'
import { patientModel } from '@/tests/mocks'

describe('GetPatientsController', () => {
  const service = {} as GetPatientsService
  const controller = new GetPatientsController(service)
  const req: any = {}
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }
  describe('handle', () => {
    it('should be able to get list of patients', async () => {
      service.execute = jest.fn().mockResolvedValue([patientModel])

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [patientModel])
    })

    it('should not be able to get list of patients', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
