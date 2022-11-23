import { RequestError } from '@/errors'
import { GetMedicalRecordsImagesByMedicalRecordIdController } from '@/main/controllers/medical-records-images'
import { GetMedicalRecordsImagesByMedicalRecordIdService } from '@/services/medical-records-images'

import { medicalRecordImageModel } from '@/tests/mocks'

describe('GetMedicalRecordsImagesByMedicalRecordIdController', () => {
  const service = {} as GetMedicalRecordsImagesByMedicalRecordIdService
  const medicalRecordsImagesController = new GetMedicalRecordsImagesByMedicalRecordIdController(service)
  const req: any = { params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    service.execute = jest.fn()
    req.params = { medicalRecordId: 'any-medical-record-id' }
  })

  describe('handle', () => {
    it('should be able to get list of medical-records-images', async () => {
      service.execute = jest.fn().mockResolvedValue([medicalRecordImageModel])

      await medicalRecordsImagesController.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.medicalRecordId)
      expect(res.json).toHaveBeenNthCalledWith(1, [medicalRecordImageModel])
    })

    it('should not be able to get list of medical-records-images', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsImagesController.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.medicalRecordId)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get list of medical-records-images-image and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsImagesController.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.medicalRecordId)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
