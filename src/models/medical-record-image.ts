import { randomUUID } from 'node:crypto'

import { MedicalRecordImageDTO } from '@/dtos'

export class MedicalRecordImageModel {
  id?: string
  medicalRecordId: string
  medicalRecordUrl: string
  created_at: Date

  constructor (medicalRecord: MedicalRecordImageDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.medicalRecordId = medicalRecord.medicalRecordId
    this.medicalRecordUrl = medicalRecord.medicalRecordUrl
    this.created_at = new Date()
  }
}
