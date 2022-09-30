import { DoctorsRepository, DoctorsSchedulesRepository } from '@/repositories'
import { DoctorScheduleEntity } from '@/repositories/entities'

export class GetDoctorsSchedulesByDoctorIdService {
  constructor (
    private readonly doctorsSchedulesRepository: DoctorsSchedulesRepository,
    private readonly doctorsRepository: DoctorsRepository
  ) {}

  async execute (sessionUserId: string, doctorId?: string): Promise<DoctorScheduleEntity[]> {
    let schedules: DoctorScheduleEntity[] = []
    if (doctorId) {
      schedules = await this.doctorsSchedulesRepository.findSchedulesByDoctorId(doctorId)
      return schedules
    } else {
      const doctor = await this.doctorsRepository.findByUserId(sessionUserId)
      if (doctor) {
        schedules = await this.doctorsSchedulesRepository.findSchedulesByDoctorId(doctor.id)
      }
    }
    return schedules
  }
}
