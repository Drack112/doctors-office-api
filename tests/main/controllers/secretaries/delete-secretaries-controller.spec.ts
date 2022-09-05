import { RequestError } from '@/errors'
import { DeleteSecretariesController } from '@/main/controllers/secretaries'
import { DeleteSecretariesService } from '@/services/secretaries'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('DeleteSecretariesController', () => {
  const secretariesService = {} as DeleteSecretariesService
  const secretariesController = new DeleteSecretariesController(secretariesService)
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
    it('should be able to delete secretaries', async () => {
      secretariesService.execute = jest.fn()

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete secretaries', async () => {
      const error = new RequestError('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete secretaries', async () => {
      const error = new Error('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
