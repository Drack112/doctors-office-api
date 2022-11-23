import { MedicalRecordImageEntity } from '@/infra/entities'
import { MedicalRecordsImagesRepository } from '@/infra/repositories'

export class GetMedicalRecordsImagesByMedicalRecordIdService {
  constructor (private readonly medicalRecordsImagesRepository: MedicalRecordsImagesRepository) {}

  async execute (medicalRecordId: string): Promise<MedicalRecordImageEntity[]> {
    return await this.medicalRecordsImagesRepository.getByMedicalRecordId(medicalRecordId)
  }
}
