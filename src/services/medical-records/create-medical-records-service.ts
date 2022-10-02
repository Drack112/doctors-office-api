import { MedicalRecordDTO } from '@/dtos'
import { MedicalRecordModel } from '@/models'
import { MedicalRecordsRepository } from '@/repositories'

export class CreateMedicalRecordsService {
  constructor (private readonly medicalRecordsRepository: MedicalRecordsRepository) {}

  async execute (params: MedicalRecordDTO): Promise<void> {
    const medicalRecord = new MedicalRecordModel(params)
    await this.medicalRecordsRepository.create(medicalRecord)
  }
}
