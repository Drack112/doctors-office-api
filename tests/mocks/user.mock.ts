
import { UserModel } from '@/models'
import { SituationStatusEnum, UserDTO, UserTypeEnum } from '@/dtos'

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
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockUser
}
