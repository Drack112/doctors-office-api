import { SituationStatusEnum } from '@/dtos/admin-dto'
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

export enum UserTypeEnum {
  admin = 'admin',
  secretary = 'secretary',
  doctor = 'doctor'
}

export type UserDTO = {
  name: string
  email: string
  password: string
  cpf: string
  userType: UserTypeEnum
  situation: SituationStatusEnum
  crm: string
  speciality: string
  created_at?: Date
}
