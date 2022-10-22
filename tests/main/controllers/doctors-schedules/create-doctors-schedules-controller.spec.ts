import { RequestError } from '@/errors'
import { CreateDoctorsSchedulesController } from '@/main/controllers/doctors-schedules'
import { CreateDoctorsSchedulesService } from '@/services/doctors-schedules'

import { mockDoctor } from '@/tests/mocks'

describe('CreateDoctorSchedulesController', () => {
  const doctorsSchedulesService = {} as CreateDoctorsSchedulesService
  const doctorsSchedulesController = new CreateDoctorsSchedulesController(doctorsSchedulesService)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockDoctor
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to create new doctors-schedules', async () => {
      doctorsSchedulesService.execute = jest.fn()

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new doctors-schedules', async () => {
      const error = new RequestError('some-error')
      doctorsSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new doctors-schedules and must return some server error ', async () => {
      const error = new Error('some-error')
      doctorsSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await doctorsSchedulesController.handle(req, res)

      expect(doctorsSchedulesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
