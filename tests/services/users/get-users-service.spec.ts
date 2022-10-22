import { UsersRepository } from '@/infra/repositories'
import { GetUsersService } from '@/services/users'

import { userModel } from '@/tests/mocks'

describe('GetUsersService', () => {
  const usersRepository = {} as UsersRepository
  const service = new GetUsersService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.get = jest.fn().mockResolvedValue(userModel)
    })

    it('should be able to get a list of users', async () => {
      await service.execute()

      expect(usersRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
