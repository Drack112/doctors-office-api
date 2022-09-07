import { BaseModel } from '@/repositories/entities'
import { Column, Entity } from 'typeorm'

@Entity('admins')
export class AdminEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  cpf!: string
}
