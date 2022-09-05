import { GetDoctorsController } from '@/main/controllers/doctors'
import { GetDoctorsService } from '@/services/doctors'
import { doctorModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetDoctorsController', () => {
  const doctorsService = {} as GetDoctorsService
  const doctorsController = new GetDoctorsController(doctorsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get list of doctors', async () => {
      doctorsService.execute = jest.fn().mockResolvedValue([doctorModel])

      await doctorsController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [doctorModel])
    })

    it('should not be able to get list of doctors', async () => {
      const error = new Error('some-error')
      doctorsService.execute = jest.fn().mockRejectedValue(error)

      await doctorsController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
