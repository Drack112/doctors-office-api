import { RequestError } from '@/errors'
import { SecretariesRepository } from '@/repositories'
import { CreateSecretariesService } from '@/services/secretaries'

import { mockSecretary, secretaryModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateSecretariesService', () => {
  const secretariesRepository = {} as SecretariesRepository
  const secretariesService = new CreateSecretariesService(secretariesRepository)

  describe('execute', () => {
    beforeAll(() => {
      secretariesRepository.create = jest.fn()
      secretariesRepository.findByCPF = jest.fn()
      secretariesRepository.findByEmail = jest.fn()
    })

    it('should be able to create new secretary successfully', async () => {
      await secretariesService.execute(mockSecretary)

      expect(secretariesRepository.create).toHaveBeenNthCalledWith(1, {
        ...secretaryModel,
        updated_at: null
      })
    })

    it('should not be able to create new secretary with existing email/cpf', async () => {
      secretariesRepository.findByCPF = jest.fn().mockResolvedValue(secretaryModel)
      const error = new RequestError('Secretária já existe.')

      const promise = secretariesService.execute(mockSecretary)

      await expect(promise).rejects.toThrow(error)
      expect(secretariesRepository.create).not.toHaveBeenCalled()
      expect(secretariesRepository.findByCPF).toHaveBeenNthCalledWith(1, mockSecretary.cpf)
    })
  })
})
