import { DoctorsRepository, DoctorsSchedulesRepository } from '@/infra/repositories'
import { GetDoctorsSchedulesByDoctorIdService } from '@/services/doctors-schedules'

import { doctorModel, mockDoctorSchedulesByDoctorId } from '@/tests/mocks'

describe('GetDoctorsSchedulesByDoctorIdService', () => {
  const doctorsSchedulesRepository = {} as DoctorsSchedulesRepository
  const doctorsRepository = {} as DoctorsRepository
  const doctorsSchedulesService = new GetDoctorsSchedulesByDoctorIdService(doctorsSchedulesRepository, doctorsRepository)
  const doctorId = 'any-doctor-id'
  const sessionUserId = 'any-session-user-id'

  describe('execute', () => {
    beforeAll(() => {
      doctorsSchedulesRepository.findSchedulesByDoctorId = jest.fn()
      doctorsRepository.findByUserId = jest.fn()
    })

    it('should be able to get list of doctor schedules with schedules by sessionUserId', async () => {
      const mockDoctorSchedulesBySessionUserId = [{ ...mockDoctorSchedulesByDoctorId[0], id: sessionUserId }]
      doctorsRepository.findByUserId = jest.fn().mockResolvedValue({ ...doctorModel, id: sessionUserId })
      doctorsSchedulesRepository.findSchedulesByDoctorId = jest.fn().mockResolvedValue(mockDoctorSchedulesBySessionUserId)

      const response = await doctorsSchedulesService.execute(sessionUserId)

      expect(response).toStrictEqual(mockDoctorSchedulesBySessionUserId)
      expect(doctorsSchedulesRepository.findSchedulesByDoctorId).toHaveBeenNthCalledWith(1, sessionUserId)
    })

    it('should be able to get list of doctor schedules with schedules by doctorId', async () => {
      doctorsRepository.findByUserId = jest.fn().mockResolvedValue(doctorModel)
      doctorsSchedulesRepository.findSchedulesByDoctorId = jest.fn().mockResolvedValue(mockDoctorSchedulesByDoctorId)

      const response = await doctorsSchedulesService.execute(sessionUserId, doctorId)

      expect(response).toStrictEqual(mockDoctorSchedulesByDoctorId)
      expect(doctorsSchedulesRepository.findSchedulesByDoctorId).toHaveBeenNthCalledWith(1, doctorId)
    })
  })
})
