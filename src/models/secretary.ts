import { SecretaryDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class SecretaryModel extends BaseModel {
  userId: string
  cpf: string

  constructor (secretary: SecretaryDTO) {
    super()
    this.userId = secretary.userId
    this.cpf = secretary.cpf
  }
}
