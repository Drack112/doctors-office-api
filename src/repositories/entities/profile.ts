import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('profiles')
export class ProfileEntity extends BaseModel {
  @Column()
  name!: string
}
