import { RequestError } from '@/errors'
import { UpdateClinicsController } from '@/main/controllers/clinics'
import { UpdateClinicsService } from '@/services/clinics'
import { mockClinic } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('UpdateClinicsController', () => {
  const clinicsService = {} as UpdateClinicsService
  const clinicsController = new UpdateClinicsController(clinicsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { ...mockClinic }
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new clinic', async () => {
      clinicsService.execute = jest.fn()

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new clinic', async () => {
      const error = new RequestError('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new clinic and must return some server error ', async () => {
      const error = new Error('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
