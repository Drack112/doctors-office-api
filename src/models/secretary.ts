import { randomUUID } from 'node:crypto'

import { SecretaryDTO } from '@/dtos'
import { environment } from '@/main/config'

import { hashSync } from 'bcryptjs'

export class SecretaryModel {
  id?: string
  name: string
  email: string
  password: string
  cpf: string
  created_at: Date
  updated_at: Date | null

  constructor (secretary: SecretaryDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = secretary.name
    this.email = secretary.email
    this.password = hashSync(secretary.password, environment.encrypt.salt)
    this.cpf = secretary.cpf
    this.created_at = new Date()
    this.updated_at = null
  }
}
