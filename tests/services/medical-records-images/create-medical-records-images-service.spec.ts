import { MedicalRecordsImagesRepository } from '@/infra/repositories'
import { LocalStorageUpload } from '@/infra/storage'
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
  const storageProvider = {} as LocalStorageUpload
  const medicalRecordsImagesService = new CreateMedicalRecordsImagesService(medicalRecordsImagesRepository, storageProvider)
  const baseURL = 'http://localhost:3333/uploads'

  describe('execute', () => {
    beforeAll(() => {
      medicalRecordsImagesRepository.create = jest.fn()
      storageProvider.saveFile = jest.fn()
    })

    it('should be able to create new medical-record successfully', async () => {
      storageProvider.saveFile = jest.fn().mockResolvedValue(`${baseURL}/any-filename.jpg`)

      await medicalRecordsImagesService.execute(mockMedicalRecordImage)

      expect(medicalRecordsImagesRepository.create).toHaveBeenNthCalledWith(1, {
        ...medicalRecordImageModel,
        createdAt: new Date()
      })
    })
  })
})
