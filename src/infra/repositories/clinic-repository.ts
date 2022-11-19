import { BaseRepository } from './base-repository'
import { ClinicEntity } from '@/infra/entities'

export class ClinicsRepository extends BaseRepository<ClinicEntity> {
  async count (): Promise<number> {
    return await this.repository.count()
  }
}
