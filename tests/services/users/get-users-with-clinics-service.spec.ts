import { UsersClinicsRepository } from '@/infra/repositories'
import { GetUsersWithClinicsService } from '@/services/users'

import { userClinicModel } from '@/tests/mocks'

describe('GetUsersWithClinicsService', () => {
  const usersClinicsRepository = {} as UsersClinicsRepository
  const service = new GetUsersWithClinicsService(usersClinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersClinicsRepository.getUsersWithClinics = jest.fn().mockResolvedValue(userClinicModel)
    })

    it('should be able to get a list of users with associated clinics', async () => {
      const userId = 'any-user-id'

      await service.execute(userId)

      expect(usersClinicsRepository.getUsersWithClinics).toHaveBeenNthCalledWith(1, userId)
    })
  })
})
