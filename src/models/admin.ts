import { AdminDTO, SituationStatusEnum } from '@/dtos'
import { BaseModel } from '@/models'

export class AdminModel extends BaseModel {
  userId: string
  cpf: string
  situation: SituationStatusEnum

  constructor (admin: AdminDTO) {
    super()
    this.userId = admin.userId
    this.situation = SituationStatusEnum.active
    this.cpf = admin.cpf
  }
}
