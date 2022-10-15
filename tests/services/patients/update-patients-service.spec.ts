import { RequestError } from '@/errors'
import { PatientsRepository } from '@/infra/repositories'
import { UpdatePatientsService } from '@/services/patients'

import { mockPatient, patientModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdatePatientsService', () => {
  const patientsRepository = {} as PatientsRepository
  const patientsService = new UpdatePatientsService(patientsRepository)

  describe('execute', () => {
    beforeEach(() => {
      patientsRepository.update = jest.fn()
      patientsRepository.findById = jest.fn()
    })

    it('should be able to update a patient successfully', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)

      await patientsService.execute('any-id', mockPatient)

      expect(patientsRepository.update).toHaveBeenNthCalledWith(1, {
        ...patientModel,
        id: 'any-id',
        updatedAt: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing patient', async () => {
      const error = new RequestError('Paciente não existe.')

      const promise = patientsService.execute('any-id', mockPatient)

      await expect(promise).rejects.toThrow(error)
      expect(patientsRepository.findById).toHaveBeenNthCalledWith(1, patientModel.id)
      expect(patientsRepository.update).not.toHaveBeenCalled()
    })
  })
})
