
import { UserModel } from '@/models'
import { UserDTO, UserTypeEnum } from '@/dtos'

export const mockUser: UserDTO = {
  name: 'any-name',
  email: 'any-email',
  password: 'any-hashed-password',
  type: UserTypeEnum.admin
}

export const userModel: UserModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockUser
}
