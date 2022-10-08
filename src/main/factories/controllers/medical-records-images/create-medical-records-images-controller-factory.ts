import { CreateMedicalRecordsImagesController } from '@/main/controllers/medical-records-images'
import { MedicalRecordsImagesRepository } from '@/infra/repositories'
import { MedicalRecordImageEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateMedicalRecordsImagesService } from '@/services/medical-records-images'
import { LocalStorageUpload } from '@/infra/storage'

export const CreateMedicalRecordsImagesControllerFactory = (): CreateMedicalRecordsImagesController => {
  const model = mysqlSource.getRepository(MedicalRecordImageEntity)
  const repository = new MedicalRecordsImagesRepository(model)
  const storgae = new LocalStorageUpload()
  const service = new CreateMedicalRecordsImagesService(repository, storgae)
  const controller = new CreateMedicalRecordsImagesController(service)
  return controller
}
