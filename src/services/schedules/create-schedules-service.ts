import { SchedulesDTO } from '@/dtos'
import { ScheduleModel } from '@/models'
import { SchedulesRepository } from '@/repositories'

export class CreateSchedulesService {
  constructor (
    private readonly schedulesRepository: SchedulesRepository) {}

  async execute (params: SchedulesDTO): Promise<void> {
    const schedule = new ScheduleModel(params)
    await this.schedulesRepository.create(schedule)
  }
}
