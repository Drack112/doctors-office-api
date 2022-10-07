import { CreateMedicalRecordsController } from '@/main/controllers/medical-records'
import { MedicalRecordsRepository } from '@/infra/repositories'
import { MedicalRecordEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateMedicalRecordsService } from '@/services/medical-records'

export const CreateMedicalRecordsControllerFactory = (): CreateMedicalRecordsController => {
  const model = mysqlSource.getRepository(MedicalRecordEntity)
  const repository = new MedicalRecordsRepository(model)
  const service = new CreateMedicalRecordsService(repository)
  const controller = new CreateMedicalRecordsController(service)
  return controller
}
