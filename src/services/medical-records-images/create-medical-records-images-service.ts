import { MedicalRecordImageDTO } from '@/dtos'
import { MedicalRecordImageModel } from '@/models'
import { MedicalRecordsImagesRepository } from '@/infra/repositories'
import { LocalStorageUpload } from '@/infra/storage'

export class CreateMedicalRecordsImagesService {
  constructor (
    private readonly medicalRecordsImagesRepository: MedicalRecordsImagesRepository,
    private readonly fileStorage: LocalStorageUpload
  ) {}

  async execute (params: MedicalRecordImageDTO): Promise<void> {
    const file = await this.fileStorage.saveFile(params.filename)
    const medicalRecordImage = new MedicalRecordImageModel({ ...params, filename: file })
    await this.medicalRecordsImagesRepository.create(medicalRecordImage)
  }
}
