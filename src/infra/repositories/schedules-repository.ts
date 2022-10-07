import { BaseRepository } from './base-repository'
import { ScheduleEntity } from '@/infra/entities'

export class SchedulesRepository extends BaseRepository<ScheduleEntity> {
  async findScheduleByDoctorScheduleId (doctorScheduleId: string): Promise<ScheduleEntity | null> {
    return await this.repository.findOne({
      where: { doctorScheduleId }
    })
  }
}
