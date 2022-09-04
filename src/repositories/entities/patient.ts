import { BaseModel } from '@/models'
import { Column, Entity } from 'typeorm'

@Entity('patients')
export class PatientEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  cpf!: string

  @Column()
  gender?: string

  @Column()
  phone!: string

  @Column()
  cep!: string

  @Column()
  address?: string

  @Column()
  birthOfDate?: string

  @Column()
  responsibleName?: string

  @Column()
  responsibleCpf?: string
}
