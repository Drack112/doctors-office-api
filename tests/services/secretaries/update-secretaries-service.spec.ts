import { SecretariesRepository } from '@/repositories'
import { UpdateSecretariesService } from '@/services/secretaries'

import { mockDoctor, doctorModel, secretaryModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateSecretariesService', () => {
  const secretariesRepository = {} as SecretariesRepository
  const secretariesService = new UpdateSecretariesService(secretariesRepository)

  describe('execute', () => {
    beforeEach(() => {
      secretariesRepository.update = jest.fn()
      secretariesRepository.findById = jest.fn()
    })

    it('should be able to update a secretary successfully', async () => {
      secretariesRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await secretariesService.execute('any-id', mockDoctor)

      expect(secretariesRepository.update).toHaveBeenNthCalledWith(1, {
        ...secretaryModel,
        id: 'any-id',
        updated_at: new Date('2022-09-01T00:00:00.000Z')
      })
    })
  })
})
