import { ClinicsRepository } from '@/infra/repositories'
import { GetClinicsService } from '@/services/clinics'

import { clinicModel } from '@/tests/mocks'

describe('GetClinicsService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new GetClinicsService(clinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      clinicsRepository.get = jest.fn().mockResolvedValue([clinicModel])
    })

    it('should be able to get a list of clinics', async () => {
      await clinicsService.execute()

      expect(clinicsRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
