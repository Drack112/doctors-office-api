import { ClinicsRepository } from '@/repositories'
import { ClinicEntity } from '@/repositories/entities'

export class GetClinicsByIdService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (id: string): Promise<ClinicEntity | null> {
    const clinic = await this.clinicsRepository.findById(id)
    return clinic
  }
}
