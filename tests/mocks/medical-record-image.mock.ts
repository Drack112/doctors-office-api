
import { MedicalRecordImageModel } from '@/models'
import { MedicalRecordImageDTO } from '@/dtos'

export const mockMedicalRecordImage: MedicalRecordImageDTO = {
  medicalRecordId: 'any-medicalRecordId',
  medicalRecordUrl: 'any-medicalRecordUrl'
}

export const medicalRecordImageModel: MedicalRecordImageModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  ...mockMedicalRecordImage
}
