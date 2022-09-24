import { SchedulesDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { ScheduleModel } from '@/models'
import { PatientsRepository, SchedulesRepository } from '@/repositories'

export class CreateSchedulesService {
  constructor (
    private readonly schedulesRepository: SchedulesRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  async execute (params: SchedulesDTO): Promise<void> {
    const { patientId } = params
    const patient = await this.patientsRepository.findById(patientId)
    if (!patient) throw new RequestError('Paciente não cadastrado.')
    const schedule = new ScheduleModel(params)
    await this.schedulesRepository.create(schedule)
  }
}
