import { RequestError } from '@/errors'
import { DoctorsSchedulesRepository } from '@/repositories'

export class DeleteDoctorsSchedulesService {
  constructor (private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository) {}

  async execute (id: string): Promise<void> {
    const doctorScheduleExists = await this.doctorsSchedulesRepository.findSchedule(id)
    if (!doctorScheduleExists) throw new RequestError('Horário de atendimento não existe.')
    await this.doctorsSchedulesRepository.delete(id)
  }
}
