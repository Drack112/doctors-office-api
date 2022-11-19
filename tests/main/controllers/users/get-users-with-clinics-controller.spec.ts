import { GetUsersWithClinicsController } from '@/main/controllers/users'
import { GetUsersWithClinicsService } from '@/services/users'
import { userClinicModel } from '@/tests/mocks'

describe('GetUsersWithClinicsController', () => {
  const service = {} as GetUsersWithClinicsService
  const controller = new GetUsersWithClinicsController(service)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.userId = 'any-user-id'
  })

  describe('handle', () => {
    it('should be able to get list of users with associated clinics', async () => {
      service.execute = jest.fn().mockResolvedValue([userClinicModel])

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [userClinicModel])
    })

    it('should not be able to get list of users with associated clinics', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
