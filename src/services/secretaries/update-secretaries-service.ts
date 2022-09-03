import { DoctorDTO } from '@/dtos'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class UpdateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (id: string, params: DoctorDTO): Promise<void> {
    const secretary = new SecretaryModel(params)
    const secretaryToUpdate = {
      ...secretary,
      id: 'any-id',
      updated_at: new Date()
    }
    await this.secretariesRepository.update(secretaryToUpdate)
  }
}
