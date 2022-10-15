import { DashboardController } from '@/main/controllers/dashboard'
import { ClinicsRepository, PatientsRepository, UsersRepository } from '@/infra/repositories'
import { ClinicEntity, PatientEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { DashboardService } from '@/services/dashboard'

export const DashboardControllerFactory = (): DashboardController => {
  const userEntity = mysqlSource.getRepository(UserEntity)
  const clinicEntity = mysqlSource.getRepository(ClinicEntity)
  const patientEntity = mysqlSource.getRepository(PatientEntity)
  const usersRepository = new UsersRepository(userEntity)
  const clinicsRepository = new ClinicsRepository(clinicEntity)
  const patientsRepository = new PatientsRepository(patientEntity)
  const service = new DashboardService(usersRepository, clinicsRepository, patientsRepository)
  const controller = new DashboardController(service)
  return controller
}
