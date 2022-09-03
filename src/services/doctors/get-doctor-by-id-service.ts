import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'
import { DoctorEntity } from '@/repositories/entities'

export class GetDoctorsByIdService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (id: string): Promise<DoctorEntity | null> {
    const doctor = await this.doctorsRepository.findById(id)
    if (!doctor) throw new RequestError('Médico não existe.')
    return doctor
  }
}
