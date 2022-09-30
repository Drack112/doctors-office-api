import { DoctorScheduleDTO } from '@/dtos'
import { BaseRepository } from '@/repositories'
import { DoctorScheduleEntity } from '@/repositories/entities'

export class DoctorsSchedulesRepository extends BaseRepository<DoctorScheduleEntity> {
  async findSchedulesByDoctorId (doctorId: string): Promise<DoctorScheduleEntity[]> {
    return await this.repository.find({
      where: { doctor_id: doctorId }
    })
  }

  async findExistingSchedules (params: DoctorScheduleDTO): Promise<boolean> {
    const { doctor_id, schedules } = params
    const foundSchedules = await this.repository.find({ where: { doctor_id } } as any)
    let hasScheduled: boolean = false
    if (foundSchedules?.length) {
      for (const schedule of schedules) {
        hasScheduled = foundSchedules.some(found => found.date === schedule.date && found.time === schedule.time)
      }
    }
    return hasScheduled
  }

  async findSchedule (id: string): Promise<DoctorScheduleEntity | null> {
    return await this.repository.findOneBy({ id } as any)
  }
}
