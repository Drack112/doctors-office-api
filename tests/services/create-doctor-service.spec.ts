import { DoctorsRepository } from '@/repositories'
import { CreateDoctorService } from '@/services'

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
    it('should be able to create doctor', async () => {
      doctorsRepository.create = jest.fn()

      await doctorsService.execute(mockDoctor)

      expect(doctorsRepository.create).toHaveBeenNthCalledWith(1, {
        ...doctorModel,
        updated_at: null
      })
    })
  })
})
