import { MedicalRecordsImagesRepository } from '@/infra/repositories'
import { GetMedicalRecordsImagesByMedicalRecordIdService } from '@/services/medical-records-images'
import { medicalRecordImageModel } from '@/tests/mocks'

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('GetMedicalRecordsImagesByMedicalRecordIdService', () => {
  const medicalRecordsImagesRepository = {} as MedicalRecordsImagesRepository
  const medicalRecordsImagesService = new GetMedicalRecordsImagesByMedicalRecordIdService(medicalRecordsImagesRepository)
  const medicalRecordId = 'any-medical-record-id'

  describe('execute', () => {
    beforeAll(() => {
      medicalRecordsImagesRepository.getByMedicalRecordId = jest.fn().mockResolvedValue([medicalRecordImageModel])
    })

    it('should be able to get list of medical-records-images', async () => {
      await medicalRecordsImagesService.execute(medicalRecordId)

      expect(medicalRecordsImagesRepository.getByMedicalRecordId).toHaveBeenNthCalledWith(1, medicalRecordId)
    })
  })
})
