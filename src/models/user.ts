import { ProfileTypeEnum, UserDTO } from '@/dtos'
import { BaseModel } from '@/models'
import { UserClinicModel } from '@/models/user-clinic'

import { randomUUID } from 'node:crypto'

export class UserModel extends BaseModel {
  name: string
  userType: string
  email: string
  password: string
  cpf: string
  crm: string
  speciality: string
  situation: string
  profileId: string
  clinicsIds?: string[]
  firstAccessAt?: Date | null

  constructor (user: UserDTO, id?: string) {
    super(user, id)
    this.name = user.name
    this.email = user.email
    this.cpf = user.cpf
    this.crm = user.crm
    this.speciality = user.speciality
    this.situation = user.situation
    this.userType = user.userType
    this.profileId = user.profileId
    this.firstAccessAt = user.firstAccessAt
    this.clinicsIds = user.clinicsIds
    this.password = user.password
  }

  public isAdmin (userType: string): boolean {
    return userType === ProfileTypeEnum.admin
  }

  public buildUserWithClinics (clinicsIds: string[]): UserClinicModel[] {
    const userClinics: UserClinicModel[] = []
    for (const clinicId of clinicsIds) {
      userClinics.push({
        id: randomUUID(),
        userId: this.id,
        clinicId
      })
    }
    return userClinics
  }
}
