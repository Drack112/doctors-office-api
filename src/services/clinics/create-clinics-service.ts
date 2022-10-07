import { ClinicDTO } from '@/dtos'
import { ClinicModel } from '@/models'
import { ClinicsRepository } from '@/infra/repositories'

export class CreateClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (params: ClinicDTO): Promise<void> {
    const clinic = new ClinicModel(params)
    await this.clinicsRepository.create(clinic)
  }
}
