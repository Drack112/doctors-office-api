import { RequestError } from '@/errors'
import { UpdatePatientsController } from '@/main/controllers/patients'
import { UpdatePatientsService } from '@/services/patients'
import { mockPatient } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('UpdatePatientsController', () => {
  const patientsService = {} as UpdatePatientsService
  const patientsController = new UpdatePatientsController(patientsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { ...mockPatient }
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
