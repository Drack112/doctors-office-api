import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'
import { UpdateAdminsService } from '@/services/admins'

import { mockAdmin, adminModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateAdminsService', () => {
  const adminsRepository = {} as AdminsRepository
  const adminsService = new UpdateAdminsService(adminsRepository)

  describe('execute', () => {
    beforeEach(() => {
      adminsRepository.update = jest.fn()
      adminsRepository.findById = jest.fn()
    })

    it('should be able to update a admin successfully', async () => {
      adminsRepository.findById = jest.fn().mockResolvedValue(adminModel)

      await adminsService.execute('any-id', mockAdmin)

      expect(adminsRepository.update).toHaveBeenNthCalledWith(1, {
        ...adminModel,
        id: 'any-id',
        updated_at: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing admin', async () => {
      const error = new RequestError('Administrador não existe.')

      const promise = adminsService.execute('any-id', mockAdmin)

      await expect(promise).rejects.toThrow(error)
      expect(adminsRepository.findById).toHaveBeenNthCalledWith(1, adminModel.id)
      expect(adminsRepository.update).not.toHaveBeenCalled()
    })
  })
})
