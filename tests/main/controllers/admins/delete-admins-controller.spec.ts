import { RequestError } from '@/errors'
import { DeleteAdminsController } from '@/main/controllers/admins'
import { DeleteAdminsService } from '@/services/admins'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('DeleteAdminsController', () => {
  const adminsService = {} as DeleteAdminsService
  const adminsController = new DeleteAdminsController(adminsService)
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
    it('should be able to delete admin', async () => {
      adminsService.execute = jest.fn()

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete admin', async () => {
      const error = new RequestError('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete a non-existing admin and return some server error', async () => {
      const error = new Error('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
