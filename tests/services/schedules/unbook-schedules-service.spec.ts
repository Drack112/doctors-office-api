import { StatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorsSchedulesRepository, SchedulesRepository } from '@/repositories'
import { UnbookSchedulesService } from '@/services/schedules'

import { doctorScheduleModel, scheduleModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UnbookSchedulesService', () => {
  const schedulesRepository = {} as SchedulesRepository
  const doctorsSchedulesRepository = {} as DoctorsSchedulesRepository
  const unbookSchedulesService = new UnbookSchedulesService(schedulesRepository, doctorsSchedulesRepository)
  const id = 'any-id'

  describe('execute', () => {
    beforeAll(() => {
      schedulesRepository.findScheduleByDoctorScheduleId = jest.fn()
      schedulesRepository.delete = jest.fn()
      doctorsSchedulesRepository.findById = jest.fn()
      doctorsSchedulesRepository.update = jest.fn()
    })

    it('should be able to unbook an schedule', async () => {
      doctorsSchedulesRepository.findById = jest.fn().mockResolvedValue(doctorScheduleModel)
      schedulesRepository.findScheduleByDoctorScheduleId = jest.fn().mockResolvedValue(scheduleModel)

      await unbookSchedulesService.execute(id)

      expect(doctorsSchedulesRepository.findById).toHaveBeenNthCalledWith(1, id)
      expect(doctorsSchedulesRepository.update).toHaveBeenNthCalledWith(1, { status: StatusEnum.available, updated_at: new Date() })
      expect(schedulesRepository.findScheduleByDoctorScheduleId).toHaveBeenNthCalledWith(1, id)
      expect(schedulesRepository.delete).toHaveBeenNthCalledWith(1, id)
    })

    it('should not be able to unbook an schedule for an non-existing doctor-schedule', async () => {
      doctorsSchedulesRepository.findById = jest.fn()
      const error = new RequestError('Data de consulta não existe.')

      const promise = unbookSchedulesService.execute(id)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsSchedulesRepository.findById).toHaveBeenNthCalledWith(1, id)
      expect(doctorsSchedulesRepository.update).not.toHaveBeenCalled()
      expect(schedulesRepository.findScheduleByDoctorScheduleId).not.toHaveBeenCalled()
      expect(schedulesRepository.delete).not.toHaveBeenCalled()
    })

    it('should not be able to unbook an schedule for an non-existing schedule', async () => {
      doctorsSchedulesRepository.findById = jest.fn().mockResolvedValue(doctorScheduleModel)
      schedulesRepository.findScheduleByDoctorScheduleId = jest.fn()
      const error = new RequestError('Agendamento não existe.')

      const promise = unbookSchedulesService.execute(id)

      await expect(promise).rejects.toThrow(error)
      expect(doctorsSchedulesRepository.findById).toHaveBeenNthCalledWith(1, id)
      expect(schedulesRepository.findScheduleByDoctorScheduleId).toHaveBeenNthCalledWith(1, id)
      expect(doctorsSchedulesRepository.update).not.toHaveBeenCalled()
      expect(schedulesRepository.delete).not.toHaveBeenCalled()
    })
  })
})
