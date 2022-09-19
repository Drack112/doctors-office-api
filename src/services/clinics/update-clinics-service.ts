import { ClinicDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { ClinicModel } from '@/models'
import { ClinicsRepository } from '@/repositories'

export class UpdateClinicsService {
  constructor (private readonly clinicsRepository: ClinicsRepository) {}

  async execute (id: string, params: ClinicDTO): Promise<void> {
    const clinicExists = await this.clinicsRepository.findById(id)
    if (!clinicExists) throw new RequestError('Clínica não existe.')
    const clinic = new ClinicModel(params)
    const clinicToUpdate = {
      ...clinic,
      id: clinicExists.id,
      updated_at: new Date()
    }
    await this.clinicsRepository.update(clinicToUpdate)
  }
}
