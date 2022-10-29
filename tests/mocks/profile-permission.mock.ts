
import { ProfilePermissionModel } from '@/models'
import { ProfilePermissionDTO } from '@/dtos'

export const mockProfilePermission: ProfilePermissionDTO = {
  moduleId: 'any-moduleId',
  profileId: 'any-profileId',
  create: true,
  read: true,
  update: true,
  delete: true
}

export const profilePermissionModel: ProfilePermissionModel = {
  id: 'any-id',
  createdAt: new Date('2022-10-01'),
  updatedAt: null,
  ...mockProfilePermission
}
