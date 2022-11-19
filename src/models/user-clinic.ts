import { randomUUID } from 'node:crypto'

import { UserClinicDTO } from '@/dtos'

export class UserClinicModel {
  id?: string
  userId: string
  clinicId: string

  constructor (userClinic: UserClinicDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.userId = userClinic.userId
    this.clinicId = userClinic.clinicId
  }
}
