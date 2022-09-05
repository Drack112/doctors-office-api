import { RequestError } from '@/errors'
import { DeletePatientsController } from '@/main/controllers/patients'
import { DeletePatientsService } from '@/services/patients'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('DeletePatientsController', () => {
  const patientsService = {} as DeletePatientsService
  const patientController = new DeletePatientsController(patientsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to delete patient', async () => {
      patientsService.execute = jest.fn()

      await patientController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete patient', async () => {
      const error = new RequestError('some-error')
      patientsService.execute = jest.fn().mockRejectedValue(error)

      await patientController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete patient', async () => {
      const error = new Error('some-error')
      patientsService.execute = jest.fn().mockRejectedValue(error)

      await patientController.handle(req, res)

      expect(patientsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
