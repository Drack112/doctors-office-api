import { BaseModel } from './base-model'
import { UserEntity } from './user'
import { ProfilePermissionEntity } from './profile-permission'

import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

@Entity('users_profiles')
export class UserProfileEntity extends BaseModel {
  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'profile_id' })
  profileId!: string

  @OneToOne(() => UserEntity)
  user!: UserEntity

  @OneToMany(() => ProfilePermissionEntity, (profilePermissions) => profilePermissions.profile)
  profilePermissions!: ProfilePermissionEntity[]
}
