import { RequestError } from '@/errors'
import { DeleteClinicsController } from '@/main/controllers/clinics'
import { DeleteClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('DeleteClinicsController', () => {
  const clinicsService = {} as DeleteClinicsService
  const clinicsController = new DeleteClinicsController(clinicsService)
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
    it('should be able to delete clinic', async () => {
      clinicsService.execute = jest.fn()

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete clinic', async () => {
      const error = new RequestError('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete a non-existing clinic and return some server error', async () => {
      const error = new Error('some-error')
      clinicsService.execute = jest.fn().mockRejectedValue(error)

      await clinicsController.handle(req, res)

      expect(clinicsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
