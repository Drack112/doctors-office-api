import { DashboardResponse } from '@/dtos'
import { ClinicsRepository, PatientsRepository, UsersRepository } from '@/infra/repositories'

export class DashboardService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly clinicsRepository: ClinicsRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  async execute (): Promise<DashboardResponse> {
    const clinics = await this.clinicsRepository.count()
    const doctors = await this.usersRepository.count('doctor')
    const secretaries = await this.usersRepository.count('secretary')
    const patients = await this.patientsRepository.count()

    const dashboard = { clinics, doctors, secretaries, patients }
    return dashboard
  }
}
