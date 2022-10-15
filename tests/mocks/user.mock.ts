
import { UserModel } from '@/models'
import { SituationStatusEnum, UserDTO, UserTypeEnum } from '@/dtos'

export const sessionUserId = 'any-session-user-id'

export const mockUser: UserDTO = {
  name: 'any-name',
  email: 'any-email',
  password: 'any-hashed-password',
  cpf: 'any-cpf',
  crm: 'any-crm',
  speciality: 'any-speciality',
  userType: UserTypeEnum.admin,
  situation: SituationStatusEnum.active
}

export const userModel: UserModel = {
  id: 'anyhash',
  createdAt: new Date('2022-09-01T00:00:00.000Z'),
  updatedAt: null,
  firstAccessAt: new Date('2022-09-01T00:00:00.000Z'),
  ...mockUser
}
