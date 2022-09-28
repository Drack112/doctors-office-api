import { UserEntity } from '@/repositories/entities'

export type LoginDTO = {
  email: string
  password: string
}

export type LoginResponseDTO = {
  access_token: string
  user: Partial<UserEntity>
}
