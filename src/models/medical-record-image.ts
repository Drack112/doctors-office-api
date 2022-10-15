import { randomUUID } from 'node:crypto'

import { MedicalRecordImageDTO } from '@/dtos'
import { environment } from '@/main/config'

export class MedicalRecordImageModel {
  id?: string
  medicalRecordId: string
  filename: string
  createdAt: Date

  constructor (medicalRecord: MedicalRecordImageDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.medicalRecordId = medicalRecord.medicalRecordId
    this.filename = this.generateImagePath(medicalRecord.filename)
    this.createdAt = new Date()
  }

  public generateImagePath (filename: string): string {
    return `${environment.uploadImage.local.url}/${filename}`
  }
}
