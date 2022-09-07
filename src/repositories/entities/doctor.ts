import { BaseModel } from '@/repositories/entities'
import { Column, Entity } from 'typeorm'

@Entity('doctors')
export class DoctorEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  cpf!: string

  @Column()
  crm!: string

  @Column()
  speciality!: string
}
