import { BaseModel } from './base-model'
import { UserProfileEntity } from '@/repositories/entities'

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

  @OneToOne(() => UserProfileEntity)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId'
  })
  userProfile!: UserProfileEntity
}
