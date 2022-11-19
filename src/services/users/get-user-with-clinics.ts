import { UserClinicEntity } from '@/infra/entities'
import { UsersClinicsRepository } from '@/infra/repositories'

export class GetUsersWithClinicsService {
  constructor (private readonly usersClinicsRepository: UsersClinicsRepository) {}

  async execute (userId: string): Promise<UserClinicEntity[]> {
    return this.usersClinicsRepository.getUsersWithClinics(userId)
  }
}
