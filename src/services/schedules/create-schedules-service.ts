import { SchedulesDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { ScheduleModel } from '@/models'
import { DoctorsRepository, PatientsRepository, SchedulesRepository } from '@/repositories'

export class CreateSchedulesService {
  constructor (
    private readonly schedulesRepository: SchedulesRepository,
    private readonly patientsRepository: PatientsRepository,
    private readonly doctorsRepository: DoctorsRepository
  ) {}

  async execute (params: SchedulesDTO): Promise<void> {
    const { patientId, doctorScheduleId } = params
    const patient = await this.patientsRepository.findById(patientId)
    if (!patient) throw new RequestError('Paciente não cadastrado.')
    const doctor = await this.doctorsRepository.findById(doctorScheduleId)
    if (!doctor) throw new RequestError('Médico não cadastrado.')
    const schedule = new ScheduleModel(params)
    await this.schedulesRepository.create(schedule)
  }
}
