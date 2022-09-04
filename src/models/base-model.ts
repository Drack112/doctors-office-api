import { Column, PrimaryColumn } from 'typeorm'

export abstract class BaseModel {
  @PrimaryColumn()
  id?: string

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
