import { SchedulesDTO, StatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { ScheduleModel } from '@/models'
import { BaseRepository } from '@/repositories'
import { DoctorEntity, DoctorScheduleEntity, PatientEntity, ScheduleEntity } from '@/repositories/entities'

export class CreateSchedulesService {
  constructor (
    private readonly schedulesRepository: BaseRepository<ScheduleEntity>,
    private readonly doctorsSchedulesRepository: BaseRepository<DoctorScheduleEntity>,
    private readonly patientsRepository: BaseRepository<PatientEntity>,
    private readonly doctorsRepository: BaseRepository<DoctorEntity>
  ) {}

  async execute (params: SchedulesDTO): Promise<void> {
    const { patientId, doctorId, doctorScheduleId } = params
    const patient = await this.patientsRepository.findById(patientId)
    if (!patient) throw new RequestError('Paciente não existe.')
    const doctor = await this.doctorsRepository.findById(doctorId)
    if (!doctor) throw new RequestError('Médico não existe.')
    const scheduleDate = await this.doctorsSchedulesRepository.findById(doctorScheduleId)
    if (!scheduleDate) throw new RequestError('Data de consulta não existe.')
    if (scheduleDate.status === StatusEnum.unavailable) throw new RequestError('Horário não disponível.')
    scheduleDate.status = StatusEnum.unavailable
    scheduleDate.updated_at = new Date()
    await this.doctorsSchedulesRepository.update(scheduleDate)
    const schedule = new ScheduleModel(params)
    // TODO pegar nome do usuário da sessao
    schedule.createdBy = 'yan'
    await this.schedulesRepository.create(schedule)
  }
}
