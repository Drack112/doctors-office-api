import { RequestError } from '@/errors'
import { DeleteDoctorsSchedulesController } from '@/main/controllers/doctors-schedules'
import { DeleteDoctorsSchedulesService } from '@/services/doctors-schedules'

import { doctorScheduleModel } from '@/tests/mocks'

describe('DeleteDoctorSchedulesController', () => {
  const doctorsSchedulesService = {} as DeleteDoctorsSchedulesService
  const doctorsSchedulesController = new DeleteDoctorsSchedulesController(doctorsSchedulesService)
  const req: any = { params: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to delete doctors-schedules', async () => {
      doctorsSchedulesService.execute = jest.fn().mockResolvedValue(doctorScheduleModel)

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to create doctors-schedules and return request error', async () => {
      const error = new RequestError('some-request-error')
      doctorsSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create doctors-schedules and return some server error', async () => {
      const error = new Error('some-error')
      doctorsSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
