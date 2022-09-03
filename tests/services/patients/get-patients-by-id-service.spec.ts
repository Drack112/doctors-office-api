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
  })
})
