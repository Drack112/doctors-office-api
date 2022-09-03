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
    })

    it('should be able to create new secretary successfully', async () => {
      await secretariesService.execute(mockSecretary)

      expect(secretariesRepository.create).toHaveBeenNthCalledWith(1, {
        ...secretaryModel,
        updated_at: null
      })
    })
  })
})
