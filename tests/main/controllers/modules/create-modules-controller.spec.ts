import { CreateModulesController } from '@/main/controllers/modules'
import { CreateModulesService } from '@/services/modules'

import { mockModule } from '@/tests/mocks'

describe('CreateModulesController', () => {
  const modulesService = {} as CreateModulesService
  const modulesController = new CreateModulesController(modulesService)
  const req: any = { body: jest.fn() }
  const res: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockModule
  })

  describe('handle', () => {
    it('should be able to create new module', async () => {
      modulesService.execute = jest.fn()

      await modulesController.handle(req, res)

      expect(modulesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
    })

    it('should not be able to create a new module and must return some server error ', async () => {
      const error = new Error('some-error')
      modulesService.execute = jest.fn().mockRejectedValue(error)

      await modulesController.handle(req, res)

      expect(modulesService.execute).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
