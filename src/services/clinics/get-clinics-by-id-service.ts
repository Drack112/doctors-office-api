import { ClinicsRepository } from '@/repositories'
import { ClinicEntity } from '@/repositories/entities'

export class GetClinicsByIdService {
  constructor (private readonly adminsRepository: ClinicsRepository) {}

  async execute (id: string): Promise<ClinicEntity | null> {
    const admin = await this.adminsRepository.findById(id)
    return admin
  }
}
