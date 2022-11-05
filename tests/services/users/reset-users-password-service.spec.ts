import { RequestError } from '@/errors'
import { DateFNSProvider } from '@/infra/date'
import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { ResetUsersPasswordService } from '@/services/users'
import { userModel, userTokenModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-hash')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('ResetUsersPasswordService', () => {
  const usersRepository = {} as UsersRepository
  const usersTokensRepository = {} as UsersTokensRepository
  const dateProvider = {} as DateFNSProvider
  const service = new ResetUsersPasswordService(usersRepository, usersTokensRepository, dateProvider)

  describe('execute', () => {
    const token = 'any-token'
    const password = 'any-password'

    beforeAll(() => {
      usersTokensRepository.findByRefreshToken = jest.fn()
      usersTokensRepository.delete = jest.fn()
      usersRepository.findById = jest.fn()
      usersRepository.update = jest.fn()
      dateProvider.compareIfBefore = jest.fn()
    })

    it('should be able to reset a user password successfully', async () => {
      usersTokensRepository.findByRefreshToken = jest.fn().mockResolvedValue(userTokenModel)
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)
      dateProvider.compareIfBefore = jest.fn()

      await service.execute(token, password)

      expect(usersRepository.update).toHaveBeenNthCalledWith(1, userModel)
      expect(usersTokensRepository.delete).toHaveBeenNthCalledWith(1, userTokenModel.id)
    })

    it('should not be able to reset a user password if token is invalid', async () => {
      usersTokensRepository.findByRefreshToken = jest.fn()
      const error = new RequestError('Token inválido.')
      const promise = service.execute(token, password)

      await expect(promise).rejects.toThrow(error)

      expect(usersRepository.update).not.toHaveBeenCalled()
      expect(usersTokensRepository.delete).not.toHaveBeenCalled()
    })

    it('should not be able to reset a user password if user not exists', async () => {
      usersTokensRepository.findByRefreshToken = jest.fn().mockResolvedValue(userTokenModel)
      usersRepository.findById = jest.fn()
      const error = new RequestError('Usuário não existe.')
      const promise = service.execute(token, password)

      await expect(promise).rejects.toThrow(error)

      expect(usersRepository.update).not.toHaveBeenCalled()
      expect(usersTokensRepository.delete).not.toHaveBeenCalled()
    })

    it('should not be able to reset a user password if token is expired', async () => {
      usersTokensRepository.findByRefreshToken = jest.fn().mockResolvedValue(userTokenModel)
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)
      dateProvider.compareIfBefore = jest.fn().mockResolvedValue(true)
      const error = new RequestError('Token expirado.')
      const promise = service.execute(token, password)

      await expect(promise).rejects.toThrow(error)

      expect(usersRepository.update).not.toHaveBeenCalled()
      expect(usersTokensRepository.delete).toHaveBeenNthCalledWith(1, userTokenModel.id)
    })
  })
})
