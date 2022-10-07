import { RequestError } from '@/errors'
import { PatientsRepository } from '@/infra/repositories'
import { PatientEntity } from '@/infra/entities'

export class GetPatientsByIdService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (id: string): Promise<PatientEntity | null> {
    const patient = await this.patientsRepository.findById(id)
    if (!patient) throw new RequestError('Paciente não existe.')
    return patient
  }
}
