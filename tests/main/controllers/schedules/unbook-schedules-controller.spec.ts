import { RequestError } from '@/errors'
import { UnbookSchedulesController } from '@/main/controllers/schedules'
import { UnbookSchedulesService } from '@/services/schedules'

describe('UnbookSchedulesController', () => {
  const service = {} as UnbookSchedulesService
  const controller = new UnbookSchedulesController(service)
  const req: any = { body: jest.fn(), params: { scheduleId: 'any-id' } }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    service.execute = jest.fn()
  })

  describe('handle', () => {
    it('should be able to unbook an schedule', async () => {
      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to unbook an schedule if some request error occurs', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to unbook an schedule if some server error occurs', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
