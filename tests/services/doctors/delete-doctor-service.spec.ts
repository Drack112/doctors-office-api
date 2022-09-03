import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'
import { DeleteDoctorService } from '@/services/doctors'

import { doctorModel } from '@/tests/mocks'

describe('DeleteDoctorService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new DeleteDoctorService(doctorsRepository)

  describe('execute', () => {
    beforeEach(() => {
      doctorsRepository.findById = jest.fn()
      doctorsRepository.delete = jest.fn()
    })

    it('should be able to delete a doctor successfully', async () => {
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await doctorsService.execute('any-id')

      expect(doctorsRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(doctorsRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to delete a non-existing', async () => {
      const error = new RequestError('Médico não existe.')

      const promise = doctorsService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(doctorsRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(doctorsRepository.delete).not.toHaveBeenCalled()
    })
  })
})
