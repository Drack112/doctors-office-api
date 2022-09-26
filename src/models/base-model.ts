import { randomUUID } from 'node:crypto'

export abstract class BaseModel {
  id?: string
  created_at!: Date
  updated_at: Date | null

  constructor () {
    if (!this.id) {
      this.id = randomUUID()
      this.created_at = new Date()
      this.updated_at = null
    } else {
      this.updated_at = new Date()
    }
  }
}
