import { RequestError } from '@/errors'
import { DeleteUsersController } from '@/main/controllers/users'
import { DeleteUsersService } from '@/services/users'

describe('DeleteUsersController', () => {
  const usersService = {} as DeleteUsersService
  const usersController = new DeleteUsersController(usersService)
  const req: any = { params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to delete user', async () => {
      usersService.execute = jest.fn()

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete user', async () => {
      const error = new RequestError('some-error')
      usersService.execute = jest.fn().mockRejectedValue(error)

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to delete a non-existing user and return some server error', async () => {
      const error = new Error('some-error')
      usersService.execute = jest.fn().mockRejectedValue(error)

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
