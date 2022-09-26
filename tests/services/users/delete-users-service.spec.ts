import { RequestError } from '@/errors'
import { UsersRepository } from '@/repositories'
import { DeleteUsersService } from '@/services/users'

import { userModel } from '@/tests/mocks'

describe('DeleteUsersService', () => {
  const usersRepository = {} as UsersRepository
  const usersService = new DeleteUsersService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.findById = jest.fn()
      usersRepository.delete = jest.fn()
    })

    it('should be able to delete a user successfully', async () => {
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)

      await usersService.execute('any-id')

      expect(usersRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(usersRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to delete a non-existing user', async () => {
      const error = new RequestError('Usuário não existe.')

      const promise = usersService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(usersRepository.delete).not.toHaveBeenCalled()
    })
  })
})
