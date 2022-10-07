import { RequestError } from '@/errors'
import { CreateMedicalRecordsController } from '@/main/controllers/medical-records'
import { CreateMedicalRecordsService } from '@/services/medical-records'

import { mockMedicalRecord } from '@/tests/mocks'

describe('CreateMedicalRecordsController', () => {
  const medicalRecordsService = {} as CreateMedicalRecordsService
  const medicalRecordsController = new CreateMedicalRecordsController(medicalRecordsService)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockMedicalRecord
  })

  describe('handle', () => {
    it('should be able to create new medical-record', async () => {
      medicalRecordsService.execute = jest.fn()

      await medicalRecordsController.handle(req, res)

      expect(medicalRecordsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new medical-record', async () => {
      const error = new RequestError('some-error')
      medicalRecordsService.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsController.handle(req, res)

      expect(medicalRecordsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new medical-record and must return some server error ', async () => {
      const error = new Error('some-error')
      medicalRecordsService.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsController.handle(req, res)

      expect(medicalRecordsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
