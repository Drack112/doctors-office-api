import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('secretaries')
export class SecretaryEntity {
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
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
