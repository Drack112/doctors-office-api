import { BaseRepository } from './base-repository'
import { PatientEntity } from '@/infra/entities'

export class PatientsRepository extends BaseRepository<PatientEntity> {
  async count (): Promise<number> {
    return await this.repository.count()
  }

  async findById (id: string): Promise<PatientEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['medicalRecord']
    })
  }
}
