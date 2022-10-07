import { MedicalRecordImageDTO } from '@/dtos'
import { MedicalRecordImageModel } from '@/models'
import { MedicalRecordsImagesRepository } from '@/infra/repositories'

export class CreateMedicalRecordsImagesService {
  constructor (private readonly medicalRecordsImagesRepository: MedicalRecordsImagesRepository) {}

  async execute (params: MedicalRecordImageDTO): Promise<void> {
    const medicalRecordImage = new MedicalRecordImageModel(params)
    await this.medicalRecordsImagesRepository.create(medicalRecordImage)
  }
}
