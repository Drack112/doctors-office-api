
import { UserTokenModel } from '@/models'
import { UserTokenDTO } from '@/dtos'

export const mockUserToken: UserTokenDTO = {
  userId: 'anyhash',
  expiresDate: new Date('2022-09-01T00:00:00.000Z'),
  refreshToken: 'anyhash'
}

export const userTokenModel: UserTokenModel = {
  id: 'anyhash',
  createdAt: new Date('2022-09-01'),
  ...mockUserToken
}
