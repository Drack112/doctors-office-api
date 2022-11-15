import { BaseRepository } from './base-repository'
import { ClinicEntity } from '@/infra/entities'

export class ClinicsRepository extends BaseRepository<ClinicEntity> {
  async count (): Promise<number> {
    return await this.repository.count()
  }

  async findByAdminId (administratorId: string): Promise<ClinicEntity | null> {
    return await this.repository.findOneBy({ administratorId })
  }
}
