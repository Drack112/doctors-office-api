import { DoctorsRepository } from '@/repositories'
import { GetDoctorsByIdService } from '@/services'

describe('GetDoctorByIdService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new GetDoctorsByIdService(doctorsRepository)

  describe('execute', () => {
    beforeEach(() => {
      doctorsRepository.findById = jest.fn()
    })

    it('should be able to get a doctor', async () => {
      await doctorsService.execute('any-id')

      expect(doctorsRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
