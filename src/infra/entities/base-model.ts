import { Column, PrimaryColumn } from 'typeorm'

export abstract class BaseModel {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'created_at' })
  createdAt!: Date

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt!: Date
}
