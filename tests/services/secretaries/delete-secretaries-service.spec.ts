import { SecretariesRepository } from '@/repositories'
import { DeleteSecretariesService } from '@/services/secretaries'

import { doctorModel } from '@/tests/mocks'

describe('DeleteSecretariesService', () => {
  const secretariesRepository = {} as SecretariesRepository
  const secretariesService = new DeleteSecretariesService(secretariesRepository)

  describe('execute', () => {
    beforeEach(() => {
      secretariesRepository.findById = jest.fn()
      secretariesRepository.delete = jest.fn()
    })

    it('should be able to delete a secretary successfully', async () => {
      secretariesRepository.findById = jest.fn().mockResolvedValue(doctorModel)

      await secretariesService.execute('any-id')

      expect(secretariesRepository.findById).toHaveBeenNthCalledWith(1, doctorModel.id)
      expect(secretariesRepository.delete).toHaveBeenNthCalledWith(1, doctorModel.id)
    })
  })
})
