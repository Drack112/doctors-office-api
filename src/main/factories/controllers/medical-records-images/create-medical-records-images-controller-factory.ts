import { CreateMedicalRecordsImagesController } from '@/main/controllers/medical-records-images'
import { MedicalRecordsImagesRepository } from '@/repositories'
import { MedicalRecordImageEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateMedicalRecordsImagesService } from '@/services/medical-records-images'

export const CreateMedicalRecordsImagesControllerFactory = (): CreateMedicalRecordsImagesController => {
  const model = mysqlSource.getRepository(MedicalRecordImageEntity)
  const repository = new MedicalRecordsImagesRepository(model)
  const service = new CreateMedicalRecordsImagesService(repository)
  const controller = new CreateMedicalRecordsImagesController(service)
  return controller
}
