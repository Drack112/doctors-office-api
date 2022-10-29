import { SituationStatusEnum } from '@/dtos/admin-dto'
import { ProfileTypeEnum } from '@/dtos/profile-dto'
import { AdminEntity, SecretaryEntity } from '@/infra/entities'

import { Repository } from 'typeorm'

export type GenericObject = {
  [key: string]: any
}

export type MountObject = {
  admin: Repository<AdminEntity>
  doctor: any
  secretary: Repository<SecretaryEntity>
}

export type UserDTO = {
  name: string
  email: string
  password: string
  cpf: string
  userType: ProfileTypeEnum
  situation: SituationStatusEnum
  crm: string
  speciality: string
  profileId: string
  createdAt?: Date
  firstAccessAt?: Date
}
