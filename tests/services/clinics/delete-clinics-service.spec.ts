import { ClinicsRepository } from '@/repositories'
import { DeleteClinicsService } from '@/services/clinics'

describe('DeleteClinicsService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new DeleteClinicsService(clinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      clinicsRepository.delete = jest.fn()
    })

    it('should be able to delete a admin successfully', async () => {
      await clinicsService.execute('any-id')

      expect(clinicsRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })
  })
})
