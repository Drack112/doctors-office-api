import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('users')
export class UserEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  type!: string
}
