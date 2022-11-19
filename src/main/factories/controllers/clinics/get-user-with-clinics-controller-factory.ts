import { GetUsersWithClinicsController } from '@/main/controllers/users'
import { UsersClinicsRepository } from '@/infra/repositories'
import { GetUsersWithClinicsService } from '@/services/users'
import { UserClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetUsersWithClinicsControllerFactory = (): GetUsersWithClinicsController => {
  const model = mysqlSource.getRepository(UserClinicEntity)
  const repository = new UsersClinicsRepository(model)
  const service = new GetUsersWithClinicsService(repository)
  const controller = new GetUsersWithClinicsController(service)
  return controller
}
