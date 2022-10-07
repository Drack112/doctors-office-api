import { PatientsRepository } from '@/infra/repositories'
import { PatientEntity } from '@/infra/entities'

export class GetPatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (): Promise<PatientEntity[]> {
    return await this.patientsRepository.get()
  }
}
