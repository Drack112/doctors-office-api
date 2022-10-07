import { RequestError } from '@/errors'
import { ClinicsRepository } from '@/infra/repositories'
import { DeleteClinicsService } from '@/services/clinics'
import { clinicModel } from '@/tests/mocks'

describe('DeleteClinicsService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new DeleteClinicsService(clinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      clinicsRepository.findById = jest.fn()
      clinicsRepository.delete = jest.fn()
    })

    it('should be able to delete a clinic successfully', async () => {
      clinicsRepository.findById = jest.fn().mockResolvedValue(clinicModel)

      await clinicsService.execute('any-id')

      expect(clinicsRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to delete a non-existing clinic', async () => {
      const error = new RequestError('Clínica não existe.')

      const promise = clinicsService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(clinicsRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(clinicsRepository.delete).not.toHaveBeenCalled()
    })
  })
})
