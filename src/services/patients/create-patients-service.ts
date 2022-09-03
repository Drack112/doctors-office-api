import { PatientDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { PatientModel } from '@/models'
import { PatientsRepository } from '@/repositories'

export class CreatePatientsService {
  constructor (private readonly patientsRepository: PatientsRepository) {}

  async execute (params: PatientDTO): Promise<void> {
    const { email } = params
    const patientsByEmail = await this.patientsRepository.findByEmail(email)
    if (patientsByEmail) throw new RequestError('Paciente já existe.')
    const patient = new PatientModel(params)
    await this.patientsRepository.create(patient)
  }
}
