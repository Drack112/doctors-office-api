import { SecretariesRepository } from '@/repositories'
import { GetSecretariesService } from '@/services/secretaries'
import { doctorModel, secretaryModel } from '@/tests/mocks'

describe('GetSecretariesService', () => {
  const secretariesRepository = {} as SecretariesRepository
  const secretariesService = new GetSecretariesService(secretariesRepository)

  describe('execute', () => {
    beforeEach(() => {
      secretariesRepository.get = jest.fn().mockResolvedValue(doctorModel)
    })

    it('should be able to get a list of secretaries', async () => {
      secretariesRepository.get = jest.fn().mockResolvedValue([secretaryModel])

      await secretariesService.execute()

      expect(secretariesRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
