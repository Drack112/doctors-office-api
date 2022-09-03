import { DoctorDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorModel } from '@/models'
import { DoctorsRepository } from '@/repositories'

export class CreateDoctorService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (params: DoctorDTO): Promise<void> {
    const { email, crm, cpf } = params
    const doctorByEmail = await this.doctorsRepository.findByEmail(email)
    const doctorByCRM = await this.doctorsRepository.findByCRM(crm)
    const doctorByCPF = await this.doctorsRepository.findByCPF(cpf)
    if (doctorByEmail ?? doctorByCRM ?? doctorByCPF) throw new RequestError('Médico já existe.')
    const doctor = new DoctorModel(params)
    await this.doctorsRepository.create(doctor)
  }
}
