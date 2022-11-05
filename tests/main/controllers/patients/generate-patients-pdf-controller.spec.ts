import { RequestError } from '@/errors'
import { GeneratePatientsPDFController } from '@/main/controllers/patients'
import { GeneratePatientsPDFService } from '@/services/patients'

describe('GeneratePatientsPDFController', () => {
  const service = {} as GeneratePatientsPDFService
  const controller = new GeneratePatientsPDFController(service)
  const req: any = {}
  const res: any = { setHeader: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis() }

  describe('handle', () => {
    it('should be able to generate pdf successfully', async () => {
      service.execute = jest.fn().mockResolvedValue(Buffer.from('any-buffer'))

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
    })

    it('should not be able to generate pdf', async () => {
      const error = new RequestError('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to generate pdf', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
