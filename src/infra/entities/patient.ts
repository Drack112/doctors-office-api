import { BaseModel } from './base-model'
import { MedicalRecordEntity } from './medical-record'

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

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
  age!: number

  @Column()
  address?: string

  @Column({ name: 'birth_date' })
  birthDate?: string

  @Column({ name: 'responsible_name' })
  responsibleName?: string

  @Column({ name: 'responsible_document' })
  responsibleDocument?: string

  @OneToOne(() => MedicalRecordEntity)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'patientId'
  })
  medicalRecord!: MedicalRecordEntity
}
