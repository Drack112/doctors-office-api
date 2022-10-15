import { ClinicsRepository, PatientsRepository, UsersRepository } from '@/infra/repositories'
import { DashboardService } from '@/services/dashboard'

import { dashboardResponse } from '@/tests/mocks'

describe('DashboardService', () => {
  const usersRepository = {} as UsersRepository
  const clinicsRepository = {} as ClinicsRepository
  const patientsRepository = {} as PatientsRepository
  const dashboardService = new DashboardService(usersRepository, clinicsRepository, patientsRepository)

  describe('execute', () => {
    beforeAll(() => {
      clinicsRepository.count = jest.fn().mockResolvedValue(0)
      usersRepository.count = jest
        .fn()
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(3)
      patientsRepository.count = jest.fn().mockResolvedValue(0)
    })

    it('should be able to get dashboard infos', async () => {
      const response = await dashboardService.execute()

      expect(response).toStrictEqual(dashboardResponse)
    })
  })
})
