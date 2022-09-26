import { RequestError } from '@/errors'
import { UsersRepository } from '@/repositories'
import { UpdateUsersService } from '@/services/users'

import { mockUser, userModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateUsersService', () => {
  const usersRepository = {} as UsersRepository
  const usersService = new UpdateUsersService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.update = jest.fn()
      usersRepository.findById = jest.fn()
    })

    it('should be able to update a user successfully', async () => {
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)

      await usersService.execute('any-id', mockUser)

      expect(usersRepository.update).toHaveBeenNthCalledWith(1, {
        ...userModel,
        id: 'any-id',
        updated_at: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing user', async () => {
      const error = new RequestError('Usuário não existe.')

      const promise = usersService.execute('any-id', mockUser)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findById).toHaveBeenNthCalledWith(1, userModel.id)
      expect(usersRepository.update).not.toHaveBeenCalled()
    })
  })
})
