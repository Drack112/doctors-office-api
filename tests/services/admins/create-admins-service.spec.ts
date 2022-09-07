import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'
import { CreateAdminsService } from '@/services/admins'

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

describe('CreateAdminsService', () => {
  const adminsRepository = {} as AdminsRepository
  const adminsService = new CreateAdminsService(adminsRepository)

  describe('execute', () => {
    beforeAll(() => {
      adminsRepository.create = jest.fn()
      adminsRepository.findByEmail = jest.fn()
      adminsRepository.findByCPF = jest.fn()
    })

    it('should be able to create new admin successfully', async () => {
      await adminsService.execute(mockAdmin)

      expect(adminsRepository.create).toHaveBeenNthCalledWith(1, {
        ...adminModel,
        updated_at: null
      })
    })

    it('should not be able to create new admin with existing cpf/email', async () => {
      adminsRepository.findByCPF = jest.fn().mockResolvedValue(adminModel)
      const error = new RequestError('Administrador já existe.')

      const promise = adminsService.execute(mockAdmin)

      await expect(promise).rejects.toThrow(error)
      expect(adminsRepository.findByCPF).toHaveBeenNthCalledWith(1, adminModel.cpf)
      expect(adminsRepository.create).not.toHaveBeenCalled()
    })
  })
})
