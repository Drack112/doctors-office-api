import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'
import { UpdateDoctorService } from '@/services/doctors'

import { mockDoctor, doctorModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateDoctorService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new UpdateDoctorService(doctorsRepository)

  describe('execute', () => {
    beforeEach(() => {
      doctorsRepository.update = jest.fn()
      doctorsRepository.findById = jest.fn()
    })

    it('should be able to update a doctor successfully', async () => {
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await doctorsService.execute('any-id', mockDoctor)

      expect(doctorsRepository.update).toHaveBeenNthCalledWith(1, {
        ...doctorModel,
        id: 'any-id',
        updated_at: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing doctor', async () => {
      const error = new RequestError('Médico não existe.')

      const promise = doctorsService.execute('any-id', mockDoctor)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsRepository.findById).toHaveBeenNthCalledWith(1, doctorModel.id)
      expect(doctorsRepository.update).not.toHaveBeenCalled()
    })
  })
})
