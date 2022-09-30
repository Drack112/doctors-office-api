import { RequestError } from '@/errors'
import { DoctorScheduleModel } from '@/models'
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
      doctorsSchedulesRepository.findExistingSchedules = jest.fn()
    })

    it('should be able to create new doctor-schedule successfully', async () => {
      await doctorsSchedulesService.execute(mockDoctorSchedule)
      const doctorScheduleModel = new DoctorScheduleModel()

      expect(doctorsSchedulesRepository.create).toHaveBeenNthCalledWith(1, [
        ...doctorScheduleModel.setObject({ ...mockDoctorSchedule })
      ])
    })

    it('should not be able to create new doctor-schedule if already has a schedule at the same time to same doctor', async () => {
      doctorsSchedulesRepository.findExistingSchedules = jest.fn().mockResolvedValue(doctorScheduleModel)
      const error = new RequestError('Horário de atendimento já cadastrado.')

      const promise = doctorsSchedulesService.execute(mockDoctorSchedule)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsSchedulesRepository.findExistingSchedules).toHaveBeenNthCalledWith(1, { ...mockDoctorSchedule })
      expect(doctorsSchedulesRepository.create).not.toHaveBeenCalled()
    })
  })
})
