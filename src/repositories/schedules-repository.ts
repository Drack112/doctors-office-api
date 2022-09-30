import { BaseRepository } from '@/repositories'
import { ScheduleEntity } from '@/repositories/entities'

export class SchedulesRepository extends BaseRepository<ScheduleEntity> {
  async findScheduleByDoctorScheduleId (doctorScheduleId: string): Promise<ScheduleEntity | null> {
    return await this.repository.findOne({
      where: { doctorScheduleId }
    })
  }
}
