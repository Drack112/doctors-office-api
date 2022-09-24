import { DeleteDoctorsSchedulesController } from '@/main/controllers/doctors-schedules'
import { DoctorsSchedulesRepository } from '@/repositories'
import { DoctorScheduleEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { DeleteDoctorsSchedulesService } from '@/services/doctors-schedules'

export const DeleteDoctorsSchedulesControllerFactory = (): DeleteDoctorsSchedulesController => {
  const model = mysqlSource.getRepository(DoctorScheduleEntity)
  const repository = new DoctorsSchedulesRepository(model)
  const service = new DeleteDoctorsSchedulesService(repository)
  const controller = new DeleteDoctorsSchedulesController(service)
  return controller
}
