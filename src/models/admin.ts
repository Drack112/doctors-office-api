import { randomUUID } from 'node:crypto'

import { AdminDTO } from '@/dtos'
import { environment } from '@/main/config'

import { hashSync } from 'bcryptjs'

export class AdminModel {
  id?: string
  name: string
  email: string
  password: string
  cpf: string
  created_at: Date
  updated_at: Date | null

  constructor (admin: AdminDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = admin.name
    this.email = admin.email
    this.password = hashSync(admin.password, environment.encrypt.salt)
    this.cpf = admin.cpf
    this.created_at = new Date()
    this.updated_at = null
  }
}
