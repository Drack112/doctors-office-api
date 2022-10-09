import { ModulesRepository } from '@/infra/repositories'
import { CreateModulesService } from '@/services/modules'

import { mockModule, moduleModel } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-10-01T00:00:00.000Z'))

describe('CreateModulesService', () => {
  const modulesRepository = {} as ModulesRepository
  const modulesService = new CreateModulesService(modulesRepository)

  describe('execute', () => {
    beforeAll(() => {
      modulesRepository.create = jest.fn()
    })

    it('should be able to create new module successfully', async () => {
      await modulesService.execute(mockModule)

      expect(modulesRepository.create).toHaveBeenNthCalledWith(1, moduleModel)
    })
  })
})
