import { PatientsRepository } from '@/repositories'
import { DeletePatientsService } from '@/services/patients/delete-patients-service'

import { patientModel } from '@/tests/mocks'

describe('DeletePatientService', () => {
  const patientsRepository = {} as PatientsRepository
  const patiensService = new DeletePatientsService(patientsRepository)

  describe('execute', () => {
    beforeEach(() => {
      patientsRepository.findById = jest.fn()
      patientsRepository.delete = jest.fn()
    })

    it('should be able to delete a patient successfully', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)

      await patiensService.execute(patientModel.id!)

      expect(patientsRepository.findById).toHaveBeenNthCalledWith(1, patientModel.id)
      expect(patientsRepository.delete).toHaveBeenNthCalledWith(1, patientModel.id)
    })
  })
})
