import { RequestError } from '@/errors'
import { DoctorsRepository, PatientsRepository, SchedulesRepository } from '@/repositories'
import { CreateSchedulesService } from '@/services/schedules'

import { doctorModel, mockSchedule, patientModel, scheduleModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateSchedulesService', () => {
  const schedulesRepository = {} as SchedulesRepository
  const patientsRepository = {} as PatientsRepository
  const doctorsRepository = {} as DoctorsRepository
  const schedulesService = new CreateSchedulesService(schedulesRepository, patientsRepository, doctorsRepository)

  describe('execute', () => {
    beforeAll(() => {
      schedulesRepository.create = jest.fn()
      patientsRepository.findById = jest.fn()
      doctorsRepository.findById = jest.fn()
    })

    it('should be able to create new schedule', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await schedulesService.execute(mockSchedule)

      expect(schedulesRepository.create).toHaveBeenNthCalledWith(1, scheduleModel)
    })

    it('should not be able to create new schedule for an non-existing patient', async () => {
      patientsRepository.findById = jest.fn()
      const error = new RequestError('Paciente não cadastrado.')

      const promise = schedulesService.execute(mockSchedule)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
    })

    it('should not be able to create new schedule for an non-existing doctor', async () => {
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsRepository.findById = jest.fn()
      const error = new RequestError('Médico não cadastrado.')

      const promise = schedulesService.execute(mockSchedule)

      await expect(promise).rejects.toThrow(error)
      expect(schedulesRepository.create).not.toHaveBeenCalled()
    })
  })
})
