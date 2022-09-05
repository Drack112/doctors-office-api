import { RequestError } from '@/errors'
import { DeleteDoctorController } from '@/main/controllers/doctors'
import { DeleteDoctorService } from '@/services/doctors'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('DeleteDoctorController', () => {
  const doctorsService = {} as DeleteDoctorService
  const doctorController = new DeleteDoctorController(doctorsService)
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
    it('should be able to delete doctor', async () => {
      doctorsService.execute = jest.fn()

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete doctor', async () => {
      const error = new RequestError('some-error')
      doctorsService.execute = jest.fn().mockRejectedValue(error)

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete doctor', async () => {
      const error = new Error('some-error')
      doctorsService.execute = jest.fn().mockRejectedValue(error)

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
