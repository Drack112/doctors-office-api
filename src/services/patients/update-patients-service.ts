import { PatientDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { PatientModel } from '@/models'
import { PatientsRepository } from '@/infra/repositories'

export class UpdatePatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (id: string, params: PatientDTO): Promise<void> {
    const patientExists = await this.patientsRepository.findById(id)
    if (!patientExists) throw new RequestError('Paciente não existe.')
    const patient = new PatientModel(params)
    const patientToUpdate = {
      ...patient,
      id: patientExists.id,
      updatedAt: new Date()
    }
    await this.patientsRepository.update(patientToUpdate)
  }
}
