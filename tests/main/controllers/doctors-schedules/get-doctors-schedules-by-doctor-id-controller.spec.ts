import { RequestError } from '@/errors'
import { GetDoctorsSchedulesByDoctorIdController } from '@/main/controllers/doctors-schedules'
import { GetDoctorsSchedulesByDoctorIdService } from '@/services/doctors-schedules'
import { mockDoctorSchedulesByDoctorId } from '@/tests/mocks'

describe('GetDoctorsSchedulesByDoctorIdController', () => {
  const getDoctorsSchedulesByDoctorIdService = {} as GetDoctorsSchedulesByDoctorIdService
  const getDoctorsSchedulesByDoctorIdController = new GetDoctorsSchedulesByDoctorIdController(getDoctorsSchedulesByDoctorIdService)
  const sessionUserId = 'any-session-user-id'
  const doctorId = 'any-doctor-id'
  const req: any = { userId: sessionUserId, params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { doctorId }
  })

  describe('handle', () => {
    it('should be able to get a list of doctors-schedules', async () => {
      getDoctorsSchedulesByDoctorIdService.execute = jest.fn().mockResolvedValue(mockDoctorSchedulesByDoctorId)

      await getDoctorsSchedulesByDoctorIdController.handle(req, res)

      expect(getDoctorsSchedulesByDoctorIdService.execute).toHaveBeenNthCalledWith(1, sessionUserId, doctorId)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, mockDoctorSchedulesByDoctorId)
    })

    it('should not be able to get a list of doctors-schedules due some request trouble', async () => {
      const error = new RequestError('some-error')
      getDoctorsSchedulesByDoctorIdService.execute = jest.fn().mockRejectedValue(error)

      await getDoctorsSchedulesByDoctorIdController.handle(req, res)

      expect(getDoctorsSchedulesByDoctorIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a list of doctors-schedules due server error', async () => {
      const error = new Error('some-error')
      getDoctorsSchedulesByDoctorIdService.execute = jest.fn().mockRejectedValue(error)

      await getDoctorsSchedulesByDoctorIdController.handle(req, res)

      expect(getDoctorsSchedulesByDoctorIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
