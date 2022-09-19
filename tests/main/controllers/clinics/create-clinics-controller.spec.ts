import { RequestError } from '@/errors'
import { CreateClinicsController } from '@/main/controllers/clinics'
import { CreateClinicsService } from '@/services/clinics'
import { mockClinic } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('CreateClinicsController', () => {
  const clinicsService = {} as CreateClinicsService
  const clinicsController = new CreateClinicsController(clinicsService)
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
    it('should be able to create new clinic', async () => {
      clinicsService.execute = jest.fn()

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new clinic', async () => {
      const error = new RequestError('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new clinic and must return some server error ', async () => {
      const error = new Error('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
