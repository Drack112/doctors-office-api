import { randomUUID } from 'node:crypto'

import { MedicalRecordDTO } from '@/dtos'

export class MedicalRecordModel {
  id?: string
  description: string
  date: Date
  patientId: string
  created_at: Date

  constructor (medicalRecord: MedicalRecordDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.description = medicalRecord.description
    this.date = medicalRecord.date
    this.patientId = medicalRecord.patientId
    this.created_at = new Date()
  }
}
