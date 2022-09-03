import { DoctorsRepository } from '@/repositories'
import { DoctorEntity } from '@/repositories/entities'

export class GetDoctorsService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (): Promise<DoctorEntity[]> {
    return await this.doctorsRepository.get()
  }
}
