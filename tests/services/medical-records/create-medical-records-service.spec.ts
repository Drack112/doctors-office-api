import { MedicalRecordsRepository } from '@/repositories'
import { CreateMedicalRecordsService } from '@/services/medical-records'

import { mockMedicalRecord, medicalRecordModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateMedicalRecordsService', () => {
  const medicalRecordsRepository = {} as MedicalRecordsRepository
  const medicalRecordsService = new CreateMedicalRecordsService(medicalRecordsRepository)

  describe('execute', () => {
    beforeAll(() => {
      medicalRecordsRepository.create = jest.fn()
    })

    it('should be able to create new medical-record successfully', async () => {
      await medicalRecordsService.execute(mockMedicalRecord)

      expect(medicalRecordsRepository.create).toHaveBeenNthCalledWith(1, medicalRecordModel)
    })
  })
})
