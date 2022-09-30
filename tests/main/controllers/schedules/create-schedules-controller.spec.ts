import { RequestError } from '@/errors'
import { CreateSchedulesController } from '@/main/controllers/schedules'
import { CreateSchedulesService } from '@/services/schedules'

import { mockSchedule, sessionUserId } from '@/tests/mocks'

describe('CreateSchedulesController', () => {
  const schedulesService = {} as CreateSchedulesService
  const schedulesController = new CreateSchedulesController(schedulesService)
  const req: any = { body: jest.fn(), userId: sessionUserId }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    schedulesService.execute = jest.fn()
    req.body = mockSchedule
  })

  describe('handle', () => {
    it('should be able to create new schedule', async () => {
      await schedulesController.handle(req, res)

      expect(schedulesService.execute).toHaveBeenNthCalledWith(1, req.body, sessionUserId)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new schedule', async () => {
      const error = new RequestError('some-error')
      schedulesService.execute = jest.fn().mockRejectedValue(error)

      await schedulesController.handle(req, res)

      expect(schedulesService.execute).toHaveBeenNthCalledWith(1, req.body, sessionUserId)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new schedule and must return some server error ', async () => {
      const error = new Error('some-error')
      schedulesService.execute = jest.fn().mockRejectedValue(error)

      await schedulesController.handle(req, res)

      expect(schedulesService.execute).toHaveBeenNthCalledWith(1, req.body, sessionUserId)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
