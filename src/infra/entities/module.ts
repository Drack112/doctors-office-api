import { BaseModel } from './base-model'

import { Column, Entity } from 'typeorm'

@Entity('modules')
export class ModuleEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  endpoint!: string
}
