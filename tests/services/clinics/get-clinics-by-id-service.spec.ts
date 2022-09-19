import { ClinicsRepository } from '@/repositories'
import { GetClinicsByIdService } from '@/services/clinics'

import { clinicModel } from '@/tests/mocks'

describe('GetClinicsByIdService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new GetClinicsByIdService(clinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      clinicsRepository.findById = jest.fn()
    })

    it('should be able to get a clinic', async () => {
      clinicsRepository.findById = jest.fn().mockResolvedValue(clinicModel)

      await clinicsService.execute('any-id')

      expect(clinicsRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
