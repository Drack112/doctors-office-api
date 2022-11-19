import { randomUUID } from 'node:crypto'

export abstract class BaseModel {
  id: string
  createdAt!: Date
  updatedAt: Date | null

  constructor (data?: any, id?: string) {
    if (id) {
      this.id = id
      this.createdAt = data.createdAt
      this.updatedAt = new Date()
    } else {
      this.id = randomUUID()
      this.createdAt = new Date()
      this.updatedAt = null
    }
  }
}
