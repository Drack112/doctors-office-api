import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'
import { UpdateUsersPasswordService } from '@/services/users'

import { mockUser, userModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'anyhash')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateUsersPasswordService', () => {
  const usersRepository = {} as UsersRepository
  const service = new UpdateUsersPasswordService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.update = jest.fn()
      usersRepository.findByEmail = jest.fn()
    })

    it('should be able to update a user password successfully', async () => {
      usersRepository.findByEmail = jest.fn().mockResolvedValue(userModel)

      await service.execute(mockUser)

      expect(usersRepository.update).toHaveBeenNthCalledWith(1, {
        ...userModel,
        id: 'anyhash',
        updatedAt: new Date('2022-09-01T00:00:00.000Z'),
        firstAccessAt: undefined
      })
    })

    it('should not be able to update user password non-existing user', async () => {
      const error = new RequestError('Usuário não existe.')

      const promise = service.execute(mockUser)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(usersRepository.update).not.toHaveBeenCalled()
    })
  })
})
