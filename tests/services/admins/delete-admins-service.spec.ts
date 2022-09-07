import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'
import { DeleteAdminsService } from '@/services/admins'

import { adminModel } from '@/tests/mocks'

describe('DeleteAdminsService', () => {
  const adminsRepository = {} as AdminsRepository
  const adminsService = new DeleteAdminsService(adminsRepository)

  describe('execute', () => {
    beforeEach(() => {
      adminsRepository.findById = jest.fn()
      adminsRepository.delete = jest.fn()
    })

    it('should be able to delete a admin successfully', async () => {
      adminsRepository.findById = jest.fn().mockResolvedValue(adminModel)

      await adminsService.execute('any-id')

      expect(adminsRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(adminsRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to delete a non-existing admin', async () => {
      const error = new RequestError('Administrador não existe.')

      const promise = adminsService.execute('any-id')

      await expect(promise).rejects.toThrow(error)
      expect(adminsRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(adminsRepository.delete).not.toHaveBeenCalled()
    })
  })
})
