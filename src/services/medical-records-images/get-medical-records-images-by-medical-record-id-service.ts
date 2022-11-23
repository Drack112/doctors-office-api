import { MedicalRecordsImagesRepository } from '@/infra/repositories'

export class GetMedicalRecordsImagesByMedicalRecordIdService {
  constructor (
    private readonly medicalRecordsImagesRepository: MedicalRecordsImagesRepository
  ) {}

  async execute (medicalRecordId: string): Promise<void> {
    await this.medicalRecordsImagesRepository.getByMedicalRecordId(medicalRecordId)
  }
}
