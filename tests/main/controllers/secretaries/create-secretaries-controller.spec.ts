import { RequestError } from '@/errors'
import { CreateSecretariesController } from '@/main/controllers/secretaries'
import { CreateSecretariesService } from '@/services/secretaries'
import { mockPatient } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('CreatesecretariesController', () => {
  const secretariesService = {} as CreateSecretariesService
  const secretariesController = new CreateSecretariesController(secretariesService)
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
    it('should be able to create new patient', async () => {
      secretariesService.execute = jest.fn()

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new patient', async () => {
      const error = new RequestError('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new patient and must return some server error ', async () => {
      const error = new Error('some-error')
      secretariesService.execute = jest.fn().mockRejectedValue(error)

      await secretariesController.handle(req, res)

      expect(secretariesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
