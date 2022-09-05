import { RequestError } from '@/errors'
import { GetDoctorByIdController } from '@/main/controllers/doctors'
import { GetDoctorsByIdService } from '@/services/doctors'
import { doctorModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetDoctorsByIdController', () => {
  const doctorsByIdService = {} as GetDoctorsByIdService
  const doctorsByIdController = new GetDoctorByIdController(doctorsByIdService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get a doctor', async () => {
      doctorsByIdService.execute = jest.fn().mockResolvedValue([doctorModel])

      await doctorsByIdController.handle(req, res)

      expect(doctorsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [doctorModel])
    })

    it('should not be able to get a doctor due some request trouble', async () => {
      const error = new RequestError('some-error')
      doctorsByIdService.execute = jest.fn().mockRejectedValue(error)

      await doctorsByIdController.handle(req, res)

      expect(doctorsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to get a doctor due server error', async () => {
      const error = new Error('some-error')
      doctorsByIdService.execute = jest.fn().mockRejectedValue(error)

      await doctorsByIdController.handle(req, res)

      expect(doctorsByIdService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
