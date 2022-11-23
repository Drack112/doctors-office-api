import { BaseRepository } from './base-repository'
import { MedicalRecordImageEntity } from '@/infra/entities'

export class MedicalRecordsImagesRepository extends BaseRepository<MedicalRecordImageEntity> {
  async getByMedicalRecordId (medicalRecordId: string): Promise<MedicalRecordImageEntity[]> {
    return await this.repository.find({
      where: { medicalRecordId }
    })
  }
}
