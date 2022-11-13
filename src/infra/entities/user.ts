import { BaseModel } from './base-model'
import { ProfileEntity } from './profile'

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity('users')
export class UserEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ name: 'profile_id' })
  profileId!: string

  @Column({ name: 'first_access_at' })
  firstAccessAt?: Date

  @OneToOne(() => ProfileEntity)
  @JoinColumn({
    name: 'profile_id',
    referencedColumnName: 'id'
  })
  profile!: ProfileEntity
}
