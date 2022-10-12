import { UserTypeEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'
import { SendMailService } from '@/services/send-mail/send-mail-service'
import { CreateUsersService } from '@/services/users'

import { mockUser, userModel } from '@/tests/mocks'

jest.mock('typeorm', () => ({
  decorator: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  Entity: jest.fn(),
  OneToOne: jest.fn(),
  OneToMany: jest.fn(),
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  DataSource: jest.fn().mockImplementation(() => ({
    getRepository: jest.fn().mockImplementation(() => ({
      save: jest.fn()
    }))
  }))
}))

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'anyhash')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateUsersService', () => {
  const usersRepository = {} as UsersRepository
  const mailService = {} as SendMailService
  const usersService = new CreateUsersService(usersRepository, mailService)

  describe('execute', () => {
    beforeAll(() => {
      usersRepository.create = jest.fn()
      usersRepository.findByEmail = jest.fn()
      mailService.execute = jest.fn()
    })

    it('should be able to create new user (admin) successfully', async () => {
      usersRepository.create = jest.fn().mockResolvedValue(userModel)

      await usersService.execute(mockUser)

      expect(usersRepository.create).toHaveBeenNthCalledWith(1, {
        ...userModel,
        updated_at: null
      })
      expect(mailService.execute).toHaveBeenNthCalledWith(1, 'new_access', mockUser, 'Acesso criado no sistema Huron')
    })

    it('should be able to create new user (secretary) successfully', async () => {
      const mockSecretary = { ...mockUser, userType: UserTypeEnum.secretary, password: 'anyhash' }
      const secretaryModel = {
        id: 'anyhash',
        created_at: new Date('2022-09-01'),
        updated_at: null,
        ...mockSecretary,
        password: 'any-hashed-password'
      }
      usersRepository.create = jest.fn().mockResolvedValue(secretaryModel)

      await usersService.execute(mockSecretary)

      expect(usersRepository.create).toHaveBeenNthCalledWith(1, {
        ...secretaryModel,
        updated_at: null
      })
      expect(mailService.execute).toHaveBeenNthCalledWith(1, 'new_access', mockSecretary, 'Acesso criado no sistema Huron')
    })

    it('should not be able to create new user (admin) with existing cpf/email', async () => {
      const mockAdmin = { ...mockUser, userType: UserTypeEnum.admin }
      const adminModel = {
        id: 'any-id',
        created_at: new Date('2022-09-01'),
        updated_at: null,
        ...mockAdmin
      }
      usersRepository.findByEmail = jest.fn().mockResolvedValue(adminModel)
      const error = new RequestError('Usuário já existe.')
      const promise = usersService.execute(mockAdmin)

      await expect(promise).rejects.toThrow(error)

      expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(usersRepository.create).not.toHaveBeenCalled()
      expect(mailService.execute).not.toHaveBeenCalled()
    })
  })
})
