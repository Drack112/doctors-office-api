import { BaseModel } from './base-model'
import { UserProfileEntity } from './user-profile'

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity('users')
export class UserEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ name: 'type' })
  userType!: string

  @Column({ name: 'first_access_at' })
  firstAccessAt?: Date

  @OneToOne(() => UserProfileEntity)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId'
  })
  userProfile!: UserProfileEntity
}
