import { ProfileDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class ProfileModel extends BaseModel {
  name: string

  constructor (module: ProfileDTO) {
    super()
    this.name = module.name
  }
}
