import { BaseRepository } from './base-repository'
import { DoctorEntity } from '@/infra/entities'

export class DoctorsRepository extends BaseRepository<DoctorEntity> {
  async findById (id: string): Promise<DoctorEntity | null> {
    return await this.repository.findOne({ id } as any)
  }

  async findByCRM (crm: string): Promise<DoctorEntity| null> {
    return await this.repository.findOneBy({ crm } as any)
  }
}
