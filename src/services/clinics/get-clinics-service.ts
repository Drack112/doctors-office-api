import { ClinicsRepository } from '@/repositories'
import { ClinicEntity } from '@/repositories/entities'

export class GetClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (): Promise<ClinicEntity[]> {
    return await this.clinicsRepository.get()
  }
}
