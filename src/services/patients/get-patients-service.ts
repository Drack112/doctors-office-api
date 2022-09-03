import { PatientsRepository } from '@/repositories'
import { PatientEntity } from '@/repositories/entities'

export class GetPatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (): Promise<PatientEntity[]> {
    return await this.patientsRepository.get()
  }
}
