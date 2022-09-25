export enum UserTypeEnum {
  admin = 'admin',
  secretary = 'secretary',
  doctor = 'doctor'
}

export type UserDTO = {
  name: string
  email: string
  password: string
  type: UserTypeEnum
}
