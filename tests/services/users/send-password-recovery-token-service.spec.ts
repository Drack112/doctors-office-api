import { RequestError } from '@/errors'
import { DateFNSProvider } from '@/infra/date'
import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { SendMailService } from '@/services/send-mail'
import { SendPasswordRecoveryTokenService } from '@/services/users'
import { userModel, userTokenModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'anyhash')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('SendPasswordRecoveryTokenService', () => {
  const usersRepository = {} as UsersRepository
  const usersTokensRepository = {} as UsersTokensRepository
  const mailService = {} as SendMailService
  const dateProvider = {} as DateFNSProvider
  const service = new SendPasswordRecoveryTokenService(usersRepository, usersTokensRepository, mailService, dateProvider)

  describe('execute', () => {
    const email = 'any-mail'

    beforeAll(() => {
      usersTokensRepository.create = jest.fn()
      usersRepository.findByEmail = jest.fn()
      dateProvider.addHours = jest.fn()
      mailService.execute = jest.fn()
    })

    it('should be able to send password recovery token mail successfully', async () => {
      usersRepository.findByEmail = jest.fn().mockResolvedValue(userModel)
      dateProvider.addHours = jest.fn().mockReturnValue(new Date('2022-09-01'))

      await service.execute(email)

      expect(usersTokensRepository.create).toHaveBeenNthCalledWith(1, userTokenModel)
    })

    it('should not be able to send password recovery token mail if user not exists', async () => {
      usersRepository.findByEmail = jest.fn()
      const error = new RequestError('Usuário não encontrado.')
      const promise = service.execute(email)

      await expect(promise).rejects.toThrow(error)
    })
  })
})
