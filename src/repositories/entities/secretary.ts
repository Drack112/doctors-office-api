import { BaseModel } from '@/repositories/entities'
import { Column, Entity } from 'typeorm'

@Entity('secretaries')
export class SecretaryEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  cpf!: string
}
