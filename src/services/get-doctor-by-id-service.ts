import { DoctorsRepository } from '@/repositories'
import { DoctorEntity } from '@/repositories/entities'

export class GetDoctorsByIdService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (id: string): Promise<DoctorEntity | null> {
    return await this.doctorsRepository.findById(id)
  }
}
