import { DoctorScheduleDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorScheduleModel } from '@/models'
import { DoctorsSchedulesRepository } from '@/repositories'

export class CreateDoctorsSchedulesService {
  constructor (private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository) {}

  async execute (params: DoctorScheduleDTO): Promise<void> {
    const doctorScheduleExists = await this.doctorsSchedulesRepository.findExistantSchedules(params)
    if (doctorScheduleExists) throw new RequestError('Horário de atendimento já cadastrado.')
    const doctorSchedule = new DoctorScheduleModel().setObject(params)
    await this.doctorsSchedulesRepository.create(doctorSchedule)
  }
}
