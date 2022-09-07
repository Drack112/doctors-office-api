import { GetAdminsController } from '@/main/controllers/admins'
import { GetAdminsService } from '@/services/admins'
import { adminModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetAdminsController', () => {
  const adminsService = {} as GetAdminsService
  const adminsController = new GetAdminsController(adminsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get list of admins', async () => {
      adminsService.execute = jest.fn().mockResolvedValue([adminModel])

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [adminModel])
    })

    it('should not be able to get list of admins', async () => {
      const error = new Error('some-error')
      adminsService.execute = jest.fn().mockRejectedValue(error)

      await adminsController.handle(req, res)

      expect(adminsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
