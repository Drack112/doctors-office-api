import { GetMedicalRecordsImagesByMedicalRecordIdController } from '@/main/controllers/medical-records-images'
import { MedicalRecordsImagesRepository } from '@/infra/repositories'
import { MedicalRecordImageEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { GetMedicalRecordsImagesByMedicalRecordIdService } from '@/services/medical-records-images'

export const GetMedicalRecordsImagesByMedicalRecordIdControllerFactory = (): GetMedicalRecordsImagesByMedicalRecordIdController => {
  const model = mysqlSource.getRepository(MedicalRecordImageEntity)
  const repository = new MedicalRecordsImagesRepository(model)
  const service = new GetMedicalRecordsImagesByMedicalRecordIdService(repository)
  const controller = new GetMedicalRecordsImagesByMedicalRecordIdController(service)
  return controller
}
