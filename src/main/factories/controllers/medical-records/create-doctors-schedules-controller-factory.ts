import { CreateMedicalRecordsController } from '@/main/controllers/medical-records'
import { MedicalRecordsRepository } from '@/repositories'
import { MedicalRecordEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateMedicalRecordsService } from '@/services/medical-records'

export const CreateMedicalRecordsControllerFactory = (): CreateMedicalRecordsController => {
  const model = mysqlSource.getRepository(MedicalRecordEntity)
  const repository = new MedicalRecordsRepository(model)
  const service = new CreateMedicalRecordsService(repository)
  const controller = new CreateMedicalRecordsController(service)
  return controller
}
