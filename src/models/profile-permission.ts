import { ProfilePermissionDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class ProfilePermissionModel extends BaseModel {
  moduleId: string
  userProfileId: string
  create: boolean
  read: boolean
  update: boolean
  delete: boolean

  constructor (profilePermission: ProfilePermissionDTO) {
    super()
    this.moduleId = profilePermission.moduleId
    this.userProfileId = profilePermission.userProfileId
    this.create = profilePermission.create
    this.read = profilePermission.read
    this.update = profilePermission.update
    this.delete = profilePermission.delete
  }
}
