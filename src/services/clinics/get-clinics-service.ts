import { ClinicsRepository } from '@/infra/repositories'
import { ClinicEntity } from '@/infra/entities'

export class GetClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (): Promise<ClinicEntity[]> {
    return await this.clinicsRepository.get()
  }
}
