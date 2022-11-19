import { ClinicDTO } from '@/dtos'
import { ClinicModel, UserClinicModel } from '@/models'
import { ClinicsRepository, UsersClinicsRepository } from '@/infra/repositories'

export class CreateClinicsService {
  constructor (
    private readonly clinicsRepository: ClinicsRepository,
    private readonly usersClinicsRepository: UsersClinicsRepository
  ) {}

  async execute (params: ClinicDTO, administratorId: string): Promise<void> {
    const clinic = new ClinicModel({ ...params, administratorId })
    const usersClinics = new UserClinicModel({ userId: administratorId, clinicId: clinic.id })
    await this.clinicsRepository.create(clinic)
    await this.usersClinicsRepository.create(usersClinics)
  }
}
