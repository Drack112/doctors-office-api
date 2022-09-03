import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'
import { CreateDoctorService } from '@/services/doctors'

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

describe('CreateDoctorService', () => {
  const doctorsRepository = {} as DoctorsRepository
  const doctorsService = new CreateDoctorService(doctorsRepository)

  describe('execute', () => {
    beforeAll(() => {
      doctorsRepository.create = jest.fn()
      doctorsRepository.findByEmail = jest.fn()
      doctorsRepository.findByCRM = jest.fn()
      doctorsRepository.findByCPF = jest.fn()
    })

    it('should be able to create new doctor successfully', async () => {
      await doctorsService.execute(mockDoctor)

      expect(doctorsRepository.create).toHaveBeenNthCalledWith(1, {
        ...doctorModel,
        updated_at: null
      })
    })

    it('should not be able to create new doctor with existing cpf', async () => {
      doctorsRepository.findByCPF = jest.fn().mockResolvedValue(doctorModel)
      const error = new RequestError('Médico já existe.')

      const promise = doctorsService.execute(mockDoctor)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsRepository.findByCPF).toHaveBeenNthCalledWith(1, doctorModel.cpf)
      expect(doctorsRepository.create).not.toHaveBeenCalled()
    })
  })
})
