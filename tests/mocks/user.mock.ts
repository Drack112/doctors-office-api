
import { UserModel } from '@/models'
import { SituationStatusEnum, UserDTO, ProfileTypeEnum } from '@/dtos'

export const sessionUserId = 'any-session-user-id'

export const mockUser: UserDTO = {
  name: 'any-name',
  email: 'any-email',
  password: 'any-hashed-password',
  cpf: 'any-cpf',
  crm: 'any-crm',
  speciality: 'any-speciality',
  userType: ProfileTypeEnum.admin,
  profileId: 'any-profileId',
  situation: SituationStatusEnum.active,
  clinicsIds: ['any-clinic-1', 'any-clinic-2']
}

export const userModel = new UserModel({
  ...mockUser,
  firstAccessAt: undefined,
  createdAt: new Date('2022-09-01T00:00:00.000Z')
})
userModel.buildUserWithClinics(mockUser.clinicsIds!)

// export const userModel: UserModel = {
//   id: 'anyhash',
//   createdAt: new Date('2022-09-01T00:00:00.000Z'),
//   updatedAt: null,
//   firstAccessAt: new Date('2022-09-01T00:00:00.000Z'),
//   ...mockUser
// }
