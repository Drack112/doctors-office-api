import { StatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorsRepository, DoctorsSchedulesRepository, PatientsRepository, SchedulesRepository } from '@/repositories'
import { BookSchedulesService } from '@/services/schedules'

import { doctorModel, doctorScheduleModel, mockSchedule, patientModel, scheduleModel, sessionUserId } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('BookSchedulesService', () => {
  const schedulesRepository = {} as SchedulesRepository
  const patientsRepository = {} as PatientsRepository
  const doctorsRepository = {} as DoctorsRepository
  const doctorsSchedulesRepository = {} as DoctorsSchedulesRepository
  const schedulesService = new BookSchedulesService(schedulesRepository, doctorsSchedulesRepository, patientsRepository, doctorsRepository)

  describe('execute', () => {
    beforeAll(() => {
      schedulesRepository.create = jest.fn()
      schedulesRepository.findById = jest.fn()
      patientsRepository.findById = jest.fn()
      doctorsRepository.findById = jest.fn()
      doctorsSchedulesRepository.findById = jest.fn()
      doctorsSchedulesRepository.update = jest.fn()
    })

    it('should be able to create new schedule', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsSchedulesRepository.findById = jest.fn().mockResolvedValue(doctorScheduleModel)
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)
      schedulesRepository.findById = jest.fn().mockResolvedValue(scheduleModel)

      await schedulesService.execute(mockSchedule, sessionUserId)

      expect(schedulesRepository.create).toHaveBeenNthCalledWith(1, { ...scheduleModel, createdBy: sessionUserId })
    })

    it('should not be able to create new schedule for an non-existing patient', async () => {
      patientsRepository.findById = jest.fn()
      const error = new RequestError('Paciente não existe.')

      const promise = schedulesService.execute(mockSchedule, sessionUserId)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
    })

    it('should not be able to create new schedule for an non-existing doctor', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsRepository.findById = jest.fn()
      const error = new RequestError('Médico não existe.')

      const promise = schedulesService.execute(mockSchedule, sessionUserId)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
    })

    it('should not be able to create new schedule for an non-existing schedule date', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)
      doctorsSchedulesRepository.findById = jest.fn()
      const error = new RequestError('Data de consulta não existe.')

      const promise = schedulesService.execute(mockSchedule, sessionUserId)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
    })

    it('should not be able to create new schedule for an unavailable schedule date', async () => {
      const unavailableSchedule = { ...doctorScheduleModel, status: StatusEnum.unavailable }
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)
      doctorsSchedulesRepository.findById = jest.fn().mockResolvedValue(unavailableSchedule)
      schedulesRepository.findById = jest.fn().mockResolvedValue(scheduleModel)
      const error = new RequestError('Horário não disponível.')

      const promise = schedulesService.execute(mockSchedule, sessionUserId)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
      expect(doctorsSchedulesRepository.update).not.toHaveBeenCalled()
    })
  })
})