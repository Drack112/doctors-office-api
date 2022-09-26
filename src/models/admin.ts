import { AdminDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class AdminModel extends BaseModel {
  userId: string
  cpf: string

  constructor (admin: AdminDTO) {
    super()
    this.userId = admin.userId
    this.cpf = admin.cpf
  }
}
