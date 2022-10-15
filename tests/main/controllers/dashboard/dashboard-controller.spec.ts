
import { DashboardController } from '@/main/controllers/dashboard'
import { DashboardService } from '@/services/dashboard'
import { dashboardResponse } from '@/tests/mocks'

describe('DashboardController', () => {
  const dashboardService = {} as DashboardService
  const dashboardController = new DashboardController(dashboardService)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  describe('handle', () => {
    it('should be able to to get dashboard info successfully', async () => {
      dashboardService.execute = jest.fn().mockResolvedValue(dashboardResponse)

      await dashboardController.handle(req, res)

      expect(dashboardService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, dashboardResponse)
    })

    it('should not be able to get dashboard info due server error', async () => {
      const error = new Error('some-error')
      dashboardService.execute = jest.fn().mockRejectedValue(error)

      await dashboardController.handle(req, res)

      expect(dashboardService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
