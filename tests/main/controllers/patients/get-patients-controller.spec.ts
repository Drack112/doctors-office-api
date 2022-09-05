import { GetPatientsController } from '@/main/controllers/patients'
import { GetPatientsService } from '@/services/patients'
import { patientModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('GetPatientsController', () => {
  const patientsService = {} as GetPatientsService
  const patientsController = new GetPatientsController(patientsService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  describe('handle', () => {
    it('should be able to get list of patients', async () => {
      patientsService.execute = jest.fn().mockResolvedValue([patientModel])

      await patientsController.handle(req, res)

      expect(patientsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [patientModel])
    })

    it('should not be able to get list of patients', async () => {
      const error = new Error('some-error')
      patientsService.execute = jest.fn().mockRejectedValue(error)

      await patientsController.handle(req, res)

      expect(patientsService.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
