import { BaseRepository } from '@/repositories'
import { DoctorEntity } from '@/repositories/entities'

export class DoctorsRepository extends BaseRepository<DoctorEntity> {
  async findByCRM (crm: string): Promise<DoctorEntity| null> {
    return await this.repository.findOneBy({ crm } as any)
  }
}
