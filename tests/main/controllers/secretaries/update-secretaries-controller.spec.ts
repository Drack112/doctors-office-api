import { RequestError } from '@/errors'
import { UpdateSecretariesController } from '@/main/controllers/secretaries'
import { UpdateSecretariesService } from '@/services/secretaries'
import { mockSecretary } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('UpdateSecretariesController', () => {
  const secretariesService = {} as UpdateSecretariesService
  const secretariesController = new UpdateSecretariesController(secretariesService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { ...mockSecretary }
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new secretary', async () => {
      secretariesService.execute = jest.fn()

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new secretary', async () => {
      const error = new RequestError('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new secretary and must return some server error ', async () => {
      const error = new Error('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
