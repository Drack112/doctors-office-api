import { BookSchedulesController } from '@/main/controllers/schedules'
import { DoctorsPatientsRepository, DoctorsRepository, DoctorsSchedulesRepository, PatientsRepository, SchedulesRepository } from '@/infra/repositories'
import { DoctorEntity, DoctorPatientEntity, DoctorScheduleEntity, PatientEntity, ScheduleEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { BookSchedulesService } from '@/services/schedules'

export const BookSchedulesControllerFactory = (): BookSchedulesController => {
  const schedule = mysqlSource.getRepository(ScheduleEntity)
  const schedulesRepository = new SchedulesRepository(schedule)
  const patient = mysqlSource.getRepository(PatientEntity)
  const patientsRepository = new PatientsRepository(patient)
  const doctorSchedule = mysqlSource.getRepository(DoctorScheduleEntity)
  const doctorsSchedulesRepository = new DoctorsSchedulesRepository(doctorSchedule)
  const doctor = mysqlSource.getRepository(DoctorEntity)
  const doctorRepository = new DoctorsRepository(doctor)
  const doctorPatient = mysqlSource.getRepository(DoctorPatientEntity)
  const doctorPatientRepository = new DoctorsPatientsRepository(doctorPatient)
  const service = new BookSchedulesService(schedulesRepository, doctorsSchedulesRepository, patientsRepository, doctorRepository, doctorPatientRepository)
  const controller = new BookSchedulesController(service)
  return controller
}
