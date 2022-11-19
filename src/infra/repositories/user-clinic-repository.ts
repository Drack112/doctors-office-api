import { BaseRepository } from './base-repository'
import { UserClinicEntity } from '@/infra/entities'

export class UsersClinicsRepository extends BaseRepository<UserClinicEntity> {
  async getUsersWithClinics (userId: string): Promise<UserClinicEntity[]> {
    return await this.repository.find({
      where: { userId },
      relations: ['clinic']
    })
  }
}
