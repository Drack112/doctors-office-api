import { RequestError } from '@/errors'
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
      expect(secretariesRepository.findById).toHaveBeenNthCalledWith(1, secretaryModel.id)
    })

    it('should not be able to get a non-existing secretary', async () => {
      const error = new RequestError('Secretária não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = secretariesService.execute(nonExistingId)

      await expect(promise).rejects.toThrow(error)
      expect(secretariesRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
    })
  })
})
