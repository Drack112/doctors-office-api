import { RequestError } from '@/errors'
import { PatientsRepository } from '@/repositories'
import { GetPatientsByIdService } from '@/services/patients'

import { patientModel } from '@/tests/mocks'

describe('GetPatientsByIdService', () => {
  const patientsRepository = {} as PatientsRepository
  const patientsService = new GetPatientsByIdService(patientsRepository)

  describe('execute', () => {
    beforeEach(() => {
      patientsRepository.findById = jest.fn()
    })

    it('should be able to get a patient', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)

      await patientsService.execute(patientModel.id!)

      expect(patientsRepository.findById).toHaveBeenCalledTimes(1)
    })

    it('should not be able to get a non-existing patient', async () => {
      const error = new RequestError('Paciente não existe.')

      const promise = patientsService.execute(patientModel.id!)

      await expect(promise).rejects.toThrow(error)
      expect(patientsRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
