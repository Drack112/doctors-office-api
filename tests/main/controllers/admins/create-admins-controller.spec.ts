import { RequestError } from '@/errors'
import { CreateAdminsController } from '@/main/controllers/admins'
import { CreateAdminsService } from '@/services/admins'
import { mockAdmin } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('CreateAdminsController', () => {
  const adminsService = {} as CreateAdminsService
  const adminsController = new CreateAdminsController(adminsService)
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
    it('should be able to create new admin', async () => {
      adminsService.execute = jest.fn()

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new admin', async () => {
      const error = new RequestError('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new admin and must return some server error ', async () => {
      const error = new Error('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
