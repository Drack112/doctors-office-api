import { RequestError } from '@/errors'
import { DoctorsSchedulesRepository } from '@/infra/repositories'
import { DeleteDoctorsSchedulesService } from '@/services/doctors-schedules'

import { doctorScheduleModel } from '@/tests/mocks'

describe('DeleteDoctorsSchedulesService', () => {
  const doctorsSchedulesRepository = {} as DoctorsSchedulesRepository
  const doctorsSchedulesService = new DeleteDoctorsSchedulesService(doctorsSchedulesRepository)
  const scheduleId = 'any-id'

  describe('execute', () => {
    beforeAll(() => {
      doctorsSchedulesRepository.delete = jest.fn()
      doctorsSchedulesRepository.findSchedule = jest.fn()
    })

    it('should be able to delete new doctor-schedule successfully', async () => {
      doctorsSchedulesRepository.findSchedule = jest.fn().mockResolvedValue(doctorScheduleModel)

      await doctorsSchedulesService.execute(scheduleId)

      expect(doctorsSchedulesRepository.delete).toHaveBeenNthCalledWith(1, scheduleId)
    })

    it('should not be able to delete new doctor-schedule if already has a schedule at the same time to same doctor', async () => {
      doctorsSchedulesRepository.findSchedule = jest.fn()
      const error = new RequestError('Horário de atendimento não existe.')

      const promise = doctorsSchedulesService.execute(scheduleId)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsSchedulesRepository.findSchedule).toHaveBeenNthCalledWith(1, scheduleId)
      expect(doctorsSchedulesRepository.delete).not.toHaveBeenCalled()
    })
  })
})
