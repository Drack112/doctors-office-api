import { BaseModel } from './base-model'
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

  @Column({ name: 'birth_date' })
  birthDate?: string

  @Column({ name: 'responsible_name' })
  responsibleName?: string

  @Column({ name: 'responsible_document' })
  responsibleDocument?: string
}
