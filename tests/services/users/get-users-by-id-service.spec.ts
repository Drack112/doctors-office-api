import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'
import { GetUsersByIdService } from '@/services/users'

import { userModel } from '@/tests/mocks'

describe('GetUsersByIdService', () => {
  const usersRepository = {} as UsersRepository
  const usersService = new GetUsersByIdService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.findById = jest.fn()
    })

    it('should be able to get a user', async () => {
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)

      await usersService.execute('any-id')

      expect(usersRepository.findById).toHaveBeenCalledTimes(1)
    })

    it('should not be able to get a user', async () => {
      const error = new RequestError('Usuário não existe.')

      const promise = usersService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
