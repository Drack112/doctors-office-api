import { StatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorsSchedulesRepository, SchedulesRepository } from '@/infra/repositories'

export class UnbookSchedulesService {
  constructor (
    private readonly schedulesRepository: SchedulesRepository,
    private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository
  ) {}

  async execute (scheduleId: string): Promise<void> {
    const doctorSchedule = await this.doctorsSchedulesRepository.findById(scheduleId)
    if (!doctorSchedule) throw new RequestError('Data de consulta não existe.')
    doctorSchedule.status = StatusEnum.available
    doctorSchedule.updatedAt = new Date()
    const schedule = await this.schedulesRepository.findScheduleByDoctorScheduleId(scheduleId)
    if (!schedule) throw new RequestError('Agendamento não existe.')
    await this.doctorsSchedulesRepository.update(doctorSchedule)
    await this.schedulesRepository.delete(schedule.id)
  }
}
