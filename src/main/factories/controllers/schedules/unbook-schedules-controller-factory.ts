import { UnbookSchedulesController } from '@/main/controllers/schedules'
import { DoctorsSchedulesRepository, SchedulesRepository } from '@/infra/repositories'
import { DoctorScheduleEntity, ScheduleEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { UnbookSchedulesService } from '@/services/schedules'

export const UnbookSchedulesControllerFactory = (): UnbookSchedulesController => {
  const schedule = mysqlSource.getRepository(ScheduleEntity)
  const schedulesRepository = new SchedulesRepository(schedule)
  const doctorSchedule = mysqlSource.getRepository(DoctorScheduleEntity)
  const doctorsSchedulesRepository = new DoctorsSchedulesRepository(doctorSchedule)
  const service = new UnbookSchedulesService(schedulesRepository, doctorsSchedulesRepository)
  const controller = new UnbookSchedulesController(service)
  return controller
}
