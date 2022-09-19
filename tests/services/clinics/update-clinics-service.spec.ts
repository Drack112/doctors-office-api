import { RequestError } from '@/errors'
import { ClinicsRepository } from '@/repositories'
import { UpdateClinicsService } from '@/services/clinics'

import { mockClinic, clinicModel } from '@/tests/mocks'

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateClinicsService', () => {
  const clinicsRepository = {} as ClinicsRepository
  const clinicsService = new UpdateClinicsService(clinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      clinicsRepository.update = jest.fn()
      clinicsRepository.findById = jest.fn()
    })

    it('should be able to update a clinic successfully', async () => {
      clinicsRepository.findById = jest.fn().mockResolvedValue(clinicModel)

      await clinicsService.execute('any-id', mockClinic)

      expect(clinicsRepository.update).toHaveBeenNthCalledWith(1, {
        ...clinicModel,
        id: 'any-id',
        updated_at: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing clinic', async () => {
      const error = new RequestError('Clínica não existe.')

      const promise = clinicsService.execute('any-id', mockClinic)

      await expect(promise).rejects.toThrow(error)
      expect(clinicsRepository.findById).toHaveBeenNthCalledWith(1, clinicModel.id)
      expect(clinicsRepository.update).not.toHaveBeenCalled()
    })
  })
})
