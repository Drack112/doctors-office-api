
import { UserTokenModel } from '@/models'
import { UserTokenDTO } from '@/dtos'

export const mockUserToken: UserTokenDTO = {
  userId: 'any-userId',
  expiresDate: new Date('2022-09-01'),
  refreshToken: 'any-refreshToken'
}

export const userTokenModel: UserTokenModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01'),
  ...mockUserToken
}
