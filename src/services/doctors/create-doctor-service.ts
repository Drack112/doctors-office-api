import { DoctorDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorModel } from '@/models'
import { DoctorsRepository } from '@/repositories'

export class CreateDoctorService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (params: DoctorDTO): Promise<void> {
    const { crm, cpf } = params
    const doctorByCRM = await this.doctorsRepository.findByCRM(crm)
    const doctorByCPF = await this.doctorsRepository.findByCPF(cpf)
    if (doctorByCRM ?? doctorByCPF) throw new RequestError('Médico já existe.')
    const doctor = new DoctorModel(params)
    await this.doctorsRepository.create(doctor)
  }
}
