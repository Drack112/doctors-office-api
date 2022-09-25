import { UserDTO } from '@/dtos'
import { randomUUID } from 'node:crypto'

export class UserModel {
  id?: string
  name: string
  type: string
  email: string
  password: string
  created_at: Date
  updated_at: Date | null

  constructor (user: UserDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = user.name
    this.email = user.email
    this.type = user.type
    this.password = user.password
    this.created_at = new Date()
    this.updated_at = null
  }
}
