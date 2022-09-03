import { RequestError } from '@/errors'
import { DoctorsRepository } from '@/repositories'

export class DeleteDoctorService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (id: string): Promise<void> {
    const doctorExists = await this.doctorsRepository.findById(id)
    if (!doctorExists) throw new RequestError('Médico não existe.')
    await this.doctorsRepository.delete(id)
  }
}
