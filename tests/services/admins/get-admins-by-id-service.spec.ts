import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'
import { GetAdminsByIdService } from '@/services/admins'

import { adminModel } from '@/tests/mocks'

describe('GetAdminsByIdService', () => {
  const adminsRepository = {} as AdminsRepository
  const adminsService = new GetAdminsByIdService(adminsRepository)

  describe('execute', () => {
    beforeEach(() => {
      adminsRepository.findById = jest.fn()
    })

    it('should be able to get a admin', async () => {
      adminsRepository.findById = jest.fn().mockResolvedValue(adminModel)

      await adminsService.execute('any-id')

      expect(adminsRepository.findById).toHaveBeenCalledTimes(1)
    })

    it('should not be able to get a admin', async () => {
      const error = new RequestError('Administrador não existe.')

      const promise = adminsService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(adminsRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
