import { MedicalRecordsImagesRepository } from '@/repositories'
import { CreateMedicalRecordsImagesService } from '@/services/medical-records-images'

import { medicalRecordImageModel, mockMedicalRecordImage } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateMedicalRecordsImagesService', () => {
  const medicalRecordsImagesRepository = {} as MedicalRecordsImagesRepository
  const medicalRecordsImagesService = new CreateMedicalRecordsImagesService(medicalRecordsImagesRepository)

  describe('execute', () => {
    beforeAll(() => {
      medicalRecordsImagesRepository.create = jest.fn()
    })

    it('should be able to create new medical-record successfully', async () => {
      await medicalRecordsImagesService.execute(mockMedicalRecordImage)

      expect(medicalRecordsImagesRepository.create).toHaveBeenNthCalledWith(1, medicalRecordImageModel)
    })
  })
})
