import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('doctors')
export class DoctorEntity {
  @PrimaryColumn()
  id!: string

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

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
