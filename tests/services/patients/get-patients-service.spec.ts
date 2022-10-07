import { PatientsRepository } from '@/infra/repositories'
import { GetPatientsService } from '@/services/patients'

import { patientModel } from '@/tests/mocks'

describe('GetPatientsService', () => {
  const patientsRepository = {} as PatientsRepository
  const patientsService = new GetPatientsService(patientsRepository)

  describe('execute', () => {
    beforeEach(() => {
      patientsRepository.get = jest.fn().mockResolvedValue([patientModel])
    })

    it('should be able to get a list of patients', async () => {
      const response = await patientsService.execute()

      expect(response).toStrictEqual([patientModel])
      expect(patientsRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
