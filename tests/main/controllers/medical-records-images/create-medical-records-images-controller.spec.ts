import { RequestError } from '@/errors'
import { CreateMedicalRecordsImagesController } from '@/main/controllers/medical-records-images'
import { CreateMedicalRecordsImagesService } from '@/services/medical-records-images'

import { mockMedicalRecordImage } from '@/tests/mocks'

describe('CreateMedicalRecordsImagesController', () => {
  const medicalRecordsImagesService = {} as CreateMedicalRecordsImagesService
  const medicalRecordsImagesController = new CreateMedicalRecordsImagesController(medicalRecordsImagesService)
  const req: any = { body: jest.fn(), file: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockMedicalRecordImage
    req.file = { filename: 'any-filename.jpg' }
  })

  describe('handle', () => {
    it('should be able to create new medical-records-image', async () => {
      medicalRecordsImagesService.execute = jest.fn()

      await medicalRecordsImagesController.handle(req, res)

      expect(medicalRecordsImagesService.execute).toHaveBeenNthCalledWith(1, mockMedicalRecordImage)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new medical-records-image', async () => {
      const error = new RequestError('some-error')
      medicalRecordsImagesService.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsImagesController.handle(req, res)

      expect(medicalRecordsImagesService.execute).toHaveBeenNthCalledWith(1, mockMedicalRecordImage)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new medical-records-image and must return some server error ', async () => {
      const error = new Error('some-error')
      medicalRecordsImagesService.execute = jest.fn().mockRejectedValue(error)

      await medicalRecordsImagesController.handle(req, res)

      expect(medicalRecordsImagesService.execute).toHaveBeenNthCalledWith(1, mockMedicalRecordImage)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
