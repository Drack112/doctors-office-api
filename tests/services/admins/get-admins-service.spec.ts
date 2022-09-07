import { AdminsRepository } from '@/repositories'
import { GetAdminsService } from '@/services/admins'

import { adminModel } from '@/tests/mocks'

describe('GetAdminsService', () => {
  const adminsRepository = {} as AdminsRepository
  const adminsService = new GetAdminsService(adminsRepository)

  describe('execute', () => {
    beforeEach(() => {
      adminsRepository.get = jest.fn().mockResolvedValue(adminModel)
    })

    it('should be able to get a list of admins', async () => {
      await adminsService.execute()

      expect(adminsRepository.get).toHaveBeenCalledTimes(1)
    })
  })
})
