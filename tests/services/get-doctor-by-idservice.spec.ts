import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'
import { GetDoctorsByIdService } from '@/services'
import { doctorModel } from '@/tests/mocks'

describe('GetDoctorByIdService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new GetDoctorsByIdService(doctorsRepository)

  describe('execute', () => {
    beforeEach(() => {
      doctorsRepository.findById = jest.fn()
    })

    it('should be able to get a doctor', async () => {
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await doctorsService.execute('any-id')

      expect(doctorsRepository.findById).toHaveBeenCalledTimes(1)
    })

    it('should not be able to get a doctor', async () => {
      const error = new RequestError('Médico não existe.')

      const promise = doctorsService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(doctorsRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
