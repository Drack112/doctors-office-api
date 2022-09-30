import { UnbookSchedulesController } from '@/main/controllers/schedules'
import { DoctorsSchedulesRepository, SchedulesRepository } from '@/repositories'
import { DoctorScheduleEntity, ScheduleEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
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
