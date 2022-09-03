import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('patients')
export class PatientEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  cpf!: string

  @Column()
  gender?: string

  @Column()
  address?: string

  @Column()
  birthOfDate?: string

  @Column()
  responsibleName?: string

  @Column()
  responsibleCpf?: string

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
