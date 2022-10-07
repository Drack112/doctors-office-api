import { RequestError } from '@/errors'
import { PatientsRepository } from '@/infra/repositories'

export class DeletePatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (id: string): Promise<void> {
    const patientExists = await this.patientsRepository.findById(id)
    if (!patientExists) throw new RequestError('Paciente não existe.')
    await this.patientsRepository.delete(id)
  }
}
