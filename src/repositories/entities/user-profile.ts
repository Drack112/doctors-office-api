import { BaseModel } from './base-model'
import { ProfilePermissionEntity, UserEntity } from '@/repositories/entities'

import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

@Entity('users_profiles')
export class UserProfileEntity extends BaseModel {
  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'profile_id' })
  profileId!: string

  @OneToOne(() => UserEntity)
  user!: UserEntity

  @OneToMany(() => ProfilePermissionEntity, (profilePermissions) => profilePermissions.userProfile)
  profilePermissions!: ProfilePermissionEntity[]
}
