import { RequestError } from '@/errors'
import { UpdateClinicsController } from '@/main/controllers/clinics'
import { UpdateClinicsService } from '@/services/clinics'
import { mockClinic } from '@/tests/mocks'

describe('UpdateClinicsController', () => {
  const service = {} as UpdateClinicsService
  const controller = new UpdateClinicsController(service)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockClinic
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new clinic', async () => {
      service.execute = jest.fn()

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new clinic', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new clinic and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
