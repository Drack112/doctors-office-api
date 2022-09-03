import { DoctorsRepository } from '@/repositories'
import { GetDoctorsService } from '@/services/doctors'

import { doctorModel } from '@/tests/mocks'

describe('GetDoctorsService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new GetDoctorsService(doctorsRepository)

  describe('execute', () => {
    beforeEach(() => {
      doctorsRepository.get = jest.fn().mockResolvedValue(doctorModel)
    })

    it('should be able to get a list of doctors', async () => {
      await doctorsService.execute()

      expect(doctorsRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
