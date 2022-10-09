
import { ProfilePermissionModel } from '@/models'
import { ProfilePermissionDTO } from '@/dtos'

export const mockProfilePermission: ProfilePermissionDTO = {
  moduleId: 'any-moduleId',
  userProfileId: 'any-userProfileId',
  create: true,
  read: true,
  update: true,
  delete: true
}

export const profilePermissionModel: ProfilePermissionModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  updated_at: null,
  ...mockProfilePermission
}
