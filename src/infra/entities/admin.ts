import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('admins')
export class AdminEntity extends BaseModel {
  @Column({ name: 'user_id' })
  userId!: string

  @Column()
  cpf!: string

  @Column()
  situation!: string
}
