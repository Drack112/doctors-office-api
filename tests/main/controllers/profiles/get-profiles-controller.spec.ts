import { GetProfilesController } from '@/main/controllers/profiles'
import { GetProfilesService } from '@/services/profiles'

import { profilesResponse } from '@/tests/mocks'

describe('GetProfilesController', () => {
  const service = {} as GetProfilesService
  const controller = new GetProfilesController(service)
  const req: any = {}
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  describe('handle', () => {
    it('should be able to get list of profiles', async () => {
      service.execute = jest.fn().mockResolvedValue(profilesResponse)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenNthCalledWith(1, profilesResponse)
    })

    it('should not be able to get list of profiles and must return some server error ', async () => {
      const error = new Error('some-error')
      service.execute = jest.fn().mockRejectedValue(error)

      await controller.handle(req, res)

      expect(service.execute).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
