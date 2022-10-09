import { ModuleDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class ModuleModel extends BaseModel {
  name: string
  description: string
  endpoint: string

  constructor (module: ModuleDTO) {
    super()
    this.name = module.name
    this.description = module.description
    this.endpoint = module.endpoint
  }
}
