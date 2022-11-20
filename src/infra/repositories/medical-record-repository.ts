import { BaseRepository } from './base-repository'
import { MedicalRecordEntity } from '@/infra/entities'

export class MedicalRecordsRepository extends BaseRepository<MedicalRecordEntity> {
  async findByPatientId (patientId: string): Promise<MedicalRecordEntity | null> {
    return await this.repository.findOne({ where: { patientId } })
  }
}
