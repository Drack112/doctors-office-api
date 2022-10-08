
import { MedicalRecordImageModel } from '@/models'
import { MedicalRecordImageDTO } from '@/dtos'

export const mockMedicalRecordImage: MedicalRecordImageDTO = {
  medicalRecordId: 'any-medicalRecordId',
  filename: 'any-filename.jpg'
}

export const medicalRecordImageModel = new MedicalRecordImageModel(mockMedicalRecordImage)
medicalRecordImageModel.generateImagePath(mockMedicalRecordImage.medicalRecordId)
