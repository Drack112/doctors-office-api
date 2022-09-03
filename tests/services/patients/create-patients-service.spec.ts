import { PatientsRepository } from '@/repositories'
import { CreatePatientsService } from '@/services/patients'

import { mockPatient, patientModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreatePatientsService', () => {
  const patientsRepository = {} as PatientsRepository
  const patiensService = new CreatePatientsService(patientsRepository)

  describe('execute', () => {
    beforeAll(() => {
      patientsRepository.create = jest.fn()
      patientsRepository.findByEmail = jest.fn()
    })

    it('should be able to create new patient successfully', async () => {
      await patiensService.execute(mockPatient)

      expect(patientsRepository.create).toHaveBeenNthCalledWith(1, {
        ...patientModel,
        updated_at: null
      })
    })
  })
})
