import { DoctorsSchedulesRepository } from '@/repositories'
import { CreateDoctorsSchedulesService } from '@/services/doctors-schedules'

import { mockDoctorSchedule, doctorScheduleModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateDoctorsSchedulesService', () => {
  const doctorsSchedulesRepository = {} as DoctorsSchedulesRepository
  const doctorsSchedulesService = new CreateDoctorsSchedulesService(doctorsSchedulesRepository)

  describe('execute', () => {
    beforeAll(() => {
      doctorsSchedulesRepository.create = jest.fn()
    })

    it('should be able to create new doctor-schedule successfully', async () => {
      await doctorsSchedulesService.execute(mockDoctorSchedule)

      expect(doctorsSchedulesRepository.create).toHaveBeenNthCalledWith(1, {
        ...doctorScheduleModel,
        updated_at: null
      })
    })
  })
})
