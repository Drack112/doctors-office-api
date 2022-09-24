import { SchedulesRepository } from '@/repositories'
import { CreateSchedulesService } from '@/services/schedules'

import { mockSchedule, scheduleModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('CreateSchedulesService', () => {
  const schedulesRepository = {} as SchedulesRepository
  const schedulesService = new CreateSchedulesService(schedulesRepository)

  describe('execute', () => {
    beforeAll(() => {
      schedulesRepository.create = jest.fn()
    })

    it('should be able to create new schedule', async () => {
      await schedulesService.execute(mockSchedule)

      expect(schedulesRepository.create).toHaveBeenNthCalledWith(1, scheduleModel)
    })
  })
})
