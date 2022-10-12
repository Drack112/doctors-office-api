import { UserDTO } from '@/dtos'
import { environment } from '@/main/config'
import { BaseModel } from '@/models'

import { hashSync } from 'bcryptjs'

export class UserModel extends BaseModel {
  name: string
  userType: string
  email: string
  password: string
  cpf: string
  crm: string
  speciality: string
  situation: string

  constructor (user: UserDTO, id?: string) {
    super(user, id)
    this.name = user.name
    this.email = user.email
    this.cpf = user.cpf
    this.crm = user.crm
    this.speciality = user.speciality
    this.situation = user.situation
    this.userType = user.userType
    this.password = this.password = hashSync(user.password, environment.encrypt.salt)
  }
}
