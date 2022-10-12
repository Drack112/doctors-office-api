import { randomUUID } from 'node:crypto'

export abstract class BaseModel {
  id?: string
  created_at!: Date
  updated_at: Date | null

  constructor (data?: any, id?: string) {
    if (id) {
      this.id = id
      this.created_at = data.created_at
      this.updated_at = new Date()
    } else {
      this.id = randomUUID()
      this.created_at = new Date()
      this.updated_at = null
    }
  }
}
