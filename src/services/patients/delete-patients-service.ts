import { RequestError } from '@/errors'
import { PatientsRepository } from '@/repositories'

export class DeletePatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (id: string): Promise<void> {
    const PatientExists = await this.patientsRepository.findById(id)
    if (!PatientExists) throw new RequestError('Médico não existe.')
    await this.patientsRepository.delete(id)
  }
}
