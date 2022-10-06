import { UserProfileEntity } from './user-profile'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('profiles_permissions')
export class ProfilePermissionEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'module_id' })
  moduleId!: string

  @Column({ name: 'user_profile_id' })
  userProfileId!: string

  @Column()
  create!: boolean

  @Column()
  read!: boolean

  @Column()
  update!: boolean

  @Column()
  delete!: boolean

  @ManyToOne(() => UserProfileEntity, (userProfile) => userProfile.profilePermissions)
  @JoinColumn({
    name: 'user_profile_id'
  })
  userProfile!: UserProfileEntity
}
