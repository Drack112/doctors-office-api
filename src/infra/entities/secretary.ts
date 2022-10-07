import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('secretaries')
export class SecretaryEntity extends BaseModel {
  @Column({ name: 'user_id' })
  userId!: string

  @Column()
  cpf!: string
}
