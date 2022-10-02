
import { MedicalRecordModel } from '@/models'
import { MedicalRecordDTO } from '@/dtos'

export const mockMedicalRecord: MedicalRecordDTO = {
  description: 'any-description',
  date: new Date('2022-10-01'),
  patientId: 'any-patientId'
}

export const medicalRecordModel: MedicalRecordModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  ...mockMedicalRecord
}
