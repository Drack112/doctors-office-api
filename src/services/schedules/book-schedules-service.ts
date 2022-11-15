import { SchedulesDTO, StatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { ScheduleModel } from '@/models'
import { DoctorsPatientsRepository, DoctorsRepository, DoctorsSchedulesRepository, PatientsRepository, SchedulesRepository } from '@/infra/repositories'
import { DoctorEntity, DoctorScheduleEntity, PatientEntity } from '@/infra/entities'
import { DoctorPatientModel } from '@/models/doctor-patient'

export class BookSchedulesService {
  constructor (
    private readonly schedulesRepository: SchedulesRepository,
    private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository,
    private readonly patientsRepository: PatientsRepository,
    private readonly doctorsRepository: DoctorsRepository,
    private readonly doctorsPatientsRepository: DoctorsPatientsRepository
  ) {}

  async execute (params: SchedulesDTO, sessionUserId: string): Promise<void> {
    const { patientId, doctorId, doctorScheduleId } = params
    const patient = await this.checkIfPatientExists(patientId)
    const doctor = await this.checkIfDoctorExists(doctorId)
    const scheduleDate = await this.checkIfDoctorScheduleExists(doctorScheduleId)
    this.checkIfScheduleDateIsAvailable(scheduleDate!)
    const updatedScheduleDate = this.updateScheduleDate(scheduleDate!)
    const schedule = new ScheduleModel(params, sessionUserId)
    const doctorPatient = new DoctorPatientModel({ doctorId: doctor!.id, patientId: patient!.id })
    await this.checkIfAlreadyHasScheduleForPatientAndDoctor(patientId, doctorId)
    await this.doctorsSchedulesRepository.update(updatedScheduleDate)
    await this.schedulesRepository.create(schedule)
    await this.doctorsPatientsRepository.create(doctorPatient)
  }

  private async checkIfPatientExists (patientId: string): Promise<PatientEntity | null> {
    const patient = await this.patientsRepository.findById(patientId)
    if (!patient) throw new RequestError('Paciente não existe.')
    return patient
  }

  private async checkIfDoctorExists (doctorId: string): Promise<DoctorEntity | null> {
    const doctor = await this.doctorsRepository.findById(doctorId)
    if (!doctor) throw new RequestError('Médico não existe.')
    return doctor
  }

  private async checkIfDoctorScheduleExists (doctorScheduleId: string): Promise<DoctorScheduleEntity | null> {
    const scheduleDate = await this.doctorsSchedulesRepository.findById(doctorScheduleId)
    if (!scheduleDate) throw new RequestError('Data de consulta não existe.')
    return scheduleDate
  }

  private async checkIfAlreadyHasScheduleForPatientAndDoctor (patientId: string, doctorId: string): Promise<void> {
    const hasSchedule = await this.doctorsPatientsRepository.findByPacientAndDoctor(patientId, doctorId)
    if (hasSchedule) throw new RequestError('Paciente já agendado.')
  }

  private checkIfScheduleDateIsAvailable (doctorSchedule: DoctorScheduleEntity): void {
    if (doctorSchedule.status === StatusEnum.unavailable) throw new RequestError('Horário não disponível.')
  }

  private updateScheduleDate (scheduleDate: DoctorScheduleEntity): DoctorScheduleEntity {
    scheduleDate.status = StatusEnum.unavailable
    scheduleDate.updatedAt = new Date()
    return scheduleDate
  }
}
