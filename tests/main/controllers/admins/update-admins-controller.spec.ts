import { RequestError } from '@/errors'
import { UpdateAdminsController } from '@/main/controllers/admins'
import { UpdateAdminsService } from '@/services/admins'
import { mockAdmin } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('UpdateAdminsController', () => {
  const adminsService = {} as UpdateAdminsService
  const adminsController = new UpdateAdminsController(adminsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { ...mockAdmin }
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new admin', async () => {
      adminsService.execute = jest.fn()

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new admin', async () => {
      const error = new RequestError('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new admin and must return some server error ', async () => {
      const error = new Error('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
