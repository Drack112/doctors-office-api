import { SecretariesRepository } from '@/repositories'
import { GetSecretariesByIdService } from '@/services/secretaries'
import { secretaryModel } from '@/tests/mocks'

describe('GetSecretariesByIdService', () => {
  const secretariesRepository = {} as SecretariesRepository
  const secretariesService = new GetSecretariesByIdService(secretariesRepository)

  describe('execute', () => {
    beforeEach(() => {
      secretariesRepository.findById = jest.fn()
    })

    it('should be able to get a secretary', async () => {
      secretariesRepository.findById = jest.fn().mockResolvedValue(secretaryModel)

      const response = await secretariesService.execute('any-id')

      expect(response).toStrictEqual(secretaryModel)
      expect(secretariesRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
