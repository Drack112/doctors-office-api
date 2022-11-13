import { UsersRepository } from '@/infra/repositories'
import { RefreshTokenService } from '@/services/auth'

import { userModel } from '@/tests/mocks'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('RefreshTokenService', () => {
  const usersRepository = {} as UsersRepository
  const service = new RefreshTokenService(usersRepository)

  describe('execute', () => {
    beforeAll(() => {
      usersRepository.findById = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should be able to generate refresh_token successfully', async () => {
      const refreshToken = 'any-refresh-token'
      const userId = 'any-user-id'
      usersRepository.findById = jest.fn().mockResolvedValue(userModel)
      jwt.sign = jest.fn().mockReturnValue(refreshToken)

      const refresh_token = await service.execute(userId)

      expect(refresh_token).toStrictEqual('any-refresh-token')
    })
  })
})
