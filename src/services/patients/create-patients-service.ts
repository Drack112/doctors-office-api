import { PatientDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { PatientModel } from '@/models'
import { PatientsRepository } from '@/infra/repositories'

export class CreatePatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (params: PatientDTO): Promise<void> {
    const { email } = params
    const patientByEmail = await this.patientsRepository.findByEmail(email)
    if (patientByEmail) throw new RequestError('Paciente já existe.')
    const patient = new PatientModel(params)
    await this.patientsRepository.create(patient)
  }
}
