import { ClinicsRepository } from '@/repositories'

export class DeleteClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (id: string): Promise<void> {
    await this.clinicsRepository.delete(id)
  }
}
