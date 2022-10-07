import { RequestError } from '@/errors'
import { PatientsRepository } from '@/infra/repositories'
import { DeletePatientsService } from '@/services/patients'

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

    it('should not be able to delete a non-existing patient', async () => {
      const error = new RequestError('Paciente não existe.')

      const promise = patiensService.execute(patientModel.id!)

      await expect(promise).rejects.toThrow(error)
      expect(patientsRepository.findById).toHaveBeenNthCalledWith(1, patientModel.id)
      expect(patientsRepository.delete).not.toHaveBeenCalled()
    })
  })
})
