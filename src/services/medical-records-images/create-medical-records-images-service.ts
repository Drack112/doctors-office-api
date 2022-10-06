import { MedicalRecordImageDTO } from '@/dtos'
import { MedicalRecordImageModel } from '@/models'
import { MedicalRecordsImagesRepository } from '@/repositories'

export class CreateMedicalRecordsImagesService {
  constructor (private readonly medicalRecordsImagesRepository: MedicalRecordsImagesRepository) {}

  async execute (params: MedicalRecordImageDTO): Promise<void> {
    const medicalRecordImage = new MedicalRecordImageModel(params)
    await this.medicalRecordsImagesRepository.create(medicalRecordImage)
  }
}
