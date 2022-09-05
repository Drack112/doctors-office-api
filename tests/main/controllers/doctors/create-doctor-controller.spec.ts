import { RequestError } from '@/errors'
import { CreateDoctorController } from '@/main/controllers/doctors'
import { CreateDoctorService } from '@/services/doctors'
import { mockDoctor } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('CreateDoctorController', () => {
  const doctorsService = {} as CreateDoctorService
  const doctorController = new CreateDoctorController(doctorsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { ...mockDoctor }
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to create new doctor', async () => {
      doctorsService.execute = jest.fn()

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create new doctor', async () => {
      const error = new RequestError('some-error')
      doctorsService.execute = jest.fn().mockRejectedValue(error)

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 400)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to create a new doctor and must return some server error ', async () => {
      const error = new Error('some-error')
      doctorsService.execute = jest.fn().mockRejectedValue(error)

      await doctorController.handle(req, res)

      expect(doctorsService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
