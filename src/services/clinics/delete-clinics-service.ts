import { RequestError } from '@/errors'
import { ClinicsRepository } from '@/repositories'

export class DeleteClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (id: string): Promise<void> {
    const clinic = await this.clinicsRepository.findById(id)
    if (!clinic) throw new RequestError('Clínica não existe.')
    await this.clinicsRepository.delete(id)
  }
}
