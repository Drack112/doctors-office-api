import { DoctorDTO } from '@/dtos'
import { DoctorModel } from '@/models'
import { DoctorsRepository } from '@/repositories'

export class CreateDoctorService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (params: DoctorDTO): Promise<void> {
    const doctor = new DoctorModel(params)
    await this.doctorsRepository.create(doctor)
  }
}
