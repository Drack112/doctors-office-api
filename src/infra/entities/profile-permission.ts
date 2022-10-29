import { ProfileEntity } from './profile'

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('profiles_permissions')
export class ProfilePermissionEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'module_id' })
  moduleId!: string

  @Column({ name: 'profile_id' })
  profileId!: string

  @Column()
  create!: boolean

  @Column()
  read!: boolean

  @Column()
  update!: boolean

  @Column()
  delete!: boolean

  @ManyToOne(() => ProfileEntity, (profile) => profile.profilePermissions)
  @JoinColumn({
    name: 'profile_id'
  })
  profile!: ProfileEntity
}
