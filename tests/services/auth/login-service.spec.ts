import { SituationStatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminsRepository, UsersRepository } from '@/infra/repositories'
import { LoginService } from '@/services/auth'

import { mockLogin, userModel } from '@/tests/mocks'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('LoginService', () => {
  const usersRepository = {} as UsersRepository
  const adminsRepository = {} as AdminsRepository
  const loginService = new LoginService(usersRepository, adminsRepository)

  describe('execute', () => {
    beforeAll(() => {
      usersRepository.findByEmail = jest.fn()
      usersRepository.update = jest.fn()
      adminsRepository.findByUserId = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should be able to generate access_token successfully', async () => {
      jwt.sign = jest.fn().mockReturnValue('any-access-token')
      bcrypt.compare = jest.fn().mockResolvedValue(true)
      usersRepository.findByEmail = jest.fn().mockResolvedValue(userModel)

      const response = await loginService.execute(mockLogin)

      expect(response.user).toStrictEqual(userModel)
      expect(response.access_token).toBe('any-access-token')
    })

    it('should not be able to generate access_token if provided email does not exists', async () => {
      const error = new RequestError('Usuário/senha inválido.')

      const promise = loginService.execute(mockLogin)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
    })

    it('should not be able to generate access_token if provided password does not matches', async () => {
      usersRepository.findByEmail = jest.fn().mockResolvedValue(userModel)
      const error = new RequestError('Usuário/senha inválido.')

      const promise = loginService.execute(mockLogin)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
    })

    it('should not be able to generate access_token if admin has situation disabled', async () => {
      const userModelDisabled = { ...userModel, situation: SituationStatusEnum.disabled }
      usersRepository.findByEmail = jest.fn().mockResolvedValue(userModelDisabled)
      adminsRepository.findByUserId = jest.fn().mockResolvedValue(userModelDisabled)
      const error = new RequestError('Acesso bloqueado.')

      const promise = loginService.execute(mockLogin)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(adminsRepository.findByUserId).toHaveBeenNthCalledWith(1, userModelDisabled.id)
    })
  })
})
