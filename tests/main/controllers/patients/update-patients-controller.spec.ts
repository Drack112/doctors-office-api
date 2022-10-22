import { RequestError } from '@/errors'
import { UpdatePatientsController } from '@/main/controllers/patients'
import { UpdatePatientsService } from '@/services/patients'
import { mockPatient } from '@/tests/mocks'

describe('UpdatePatientsController', () => {
  const patientsService = {} as UpdatePatientsService
  const patientsController = new UpdatePatientsController(patientsService)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockPatient
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new patient', async () => {
      patientsService.execute = jest.fn()

      await patientsController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new patient', async () => {
      const error = new RequestError('some-error')
      patientsService.execute = jest.fn().mockRejectedValue(error)

      await patientsController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new patient and must return some server error ', async () => {
      const error = new Error('some-error')
      patientsService.execute = jest.fn().mockRejectedValue(error)

      await patientsController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
