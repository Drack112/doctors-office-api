import { BaseRepository } from './base-repository'
import { DoctorPatientEntity } from '@/infra/entities'

export class DoctorsPatientsRepository extends BaseRepository<DoctorPatientEntity> {
  async findByPacientAndDoctor (patientId: string, doctorId: string): Promise<DoctorPatientEntity | null> {
    return await this.repository.findOne({
      where: { patientId, doctorId }
    })
  }
}
