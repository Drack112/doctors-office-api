import { Column, PrimaryColumn } from 'typeorm'

export abstract class BaseModel {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'createdAt' })
  createdAt!: Date

  @Column({ nullable: true, name: 'updatedAt' })
  updatedAt!: Date
}
