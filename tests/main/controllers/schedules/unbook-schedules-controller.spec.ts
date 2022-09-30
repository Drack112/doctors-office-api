import { RequestError } from '@/errors'
import { UnbookSchedulesController } from '@/main/controllers/schedules'
import { UnbookSchedulesService } from '@/services/schedules'

describe('UnbookSchedulesController', () => {
  const unbookSchedulesService = {} as UnbookSchedulesService
  const unbookSchedulesController = new UnbookSchedulesController(unbookSchedulesService)
  const req: any = { body: jest.fn(), params: { scheduleId: 'any-id' } }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    unbookSchedulesService.execute = jest.fn()
  })

  describe('handle', () => {
    it('should be able to unbook an schedule', async () => {
      await unbookSchedulesController.handle(req, res)

      expect(unbookSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to unbook an schedule if some request error occurs', async () => {
      const error = new RequestError('some-error')
      unbookSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await unbookSchedulesController.handle(req, res)

      expect(unbookSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to unbook an schedule if some server error occurs', async () => {
      const error = new Error('some-error')
      unbookSchedulesService.execute = jest.fn().mockRejectedValue(error)

      await unbookSchedulesController.handle(req, res)

      expect(unbookSchedulesService.execute).toHaveBeenNthCalledWith(1, req.params.scheduleId)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
