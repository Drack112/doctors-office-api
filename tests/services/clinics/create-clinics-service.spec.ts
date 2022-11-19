import { ClinicsRepository } from '@/infra/repositories'
import { CreateClinicsService } from '@/services/clinics'

import { mockClinic, clinicModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateClinicsService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new CreateClinicsService(clinicsRepository)

  describe('execute', () => {
    beforeAll(() => {
      clinicsRepository.create = jest.fn()
    })

    it('should be able to create new clinic successfully', async () => {
      await clinicsService.execute(mockClinic, mockClinic.administratorId)

      expect(clinicsRepository.create).toHaveBeenNthCalledWith(1, {
        ...clinicModel,
        updatedAt: null
      })
    })
  })
})
