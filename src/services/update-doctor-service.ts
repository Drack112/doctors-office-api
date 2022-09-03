import { DoctorDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { DoctorModel } from '@/models'
import { DoctorsRepository } from '@/repositories'

export class UpdateDoctorService {
  constructor (private readonly doctorsRepository: DoctorsRepository) {}

  async execute (id: string, params: DoctorDTO): Promise<void> {
    const doctorExists = await this.doctorsRepository.findById(id)
    if (!doctorExists) throw new RequestError('Médico não existe.')
    console.log('doctorExists', doctorExists)
    const doctor = new DoctorModel(params)
    const doctorToUpdate = {
      ...doctor,
      id: doctorExists.id,
      updated_at: new Date()
    }
    console.log('doctorToUpdate', doctorToUpdate)
    await this.doctorsRepository.update(doctorToUpdate)
  }
}
