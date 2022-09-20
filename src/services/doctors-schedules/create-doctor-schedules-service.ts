import { DoctorScheduleDTO } from '@/dtos'
import { DoctorScheduleModel } from '@/models'
import { DoctorsSchedulesRepository } from '@/repositories'

export class CreateDoctorsSchedulesService {
  constructor (private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository) {}

  async execute (params: DoctorScheduleDTO): Promise<void> {
    const doctorSchedule = new DoctorScheduleModel(params)
    await this.doctorsSchedulesRepository.create(doctorSchedule)
  }
}
