import { UserModel } from '@/models'

export type LoginDTO = {
  email: string
  password: string
}

export type LoginResponseDTO = {
  access_token: string
  user: Partial<UserModel>
}
