import { CreateSchedulesController } from '@/main/controllers/schedules'
import { DoctorsRepository, DoctorsSchedulesRepository, PatientsRepository, SchedulesRepository } from '@/repositories'
import { DoctorEntity, DoctorScheduleEntity, PatientEntity, ScheduleEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateSchedulesService } from '@/services/schedules'

export const CreateSchedulesControllerFactory = (): CreateSchedulesController => {
  const schedule = mysqlSource.getRepository(ScheduleEntity)
  const schedulesRepository = new SchedulesRepository(schedule)
  const patient = mysqlSource.getRepository(PatientEntity)
  const patientsRepository = new PatientsRepository(patient)
  const doctorSchedule = mysqlSource.getRepository(DoctorScheduleEntity)
  const doctorsSchedulesRepository = new DoctorsSchedulesRepository(doctorSchedule)
  const doctor = mysqlSource.getRepository(DoctorEntity)
  const doctorRepository = new DoctorsRepository(doctor)
  const service = new CreateSchedulesService(schedulesRepository, doctorsSchedulesRepository, patientsRepository, doctorRepository)
  const controller = new CreateSchedulesController(service)
  return controller
}
