import { SecretaryDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class UpdateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (id: string, params: SecretaryDTO): Promise<void> {
    const secretaryExists = await this.secretariesRepository.findById(id)
    if (!secretaryExists) throw new RequestError('Secretária não existe.')
    const secretary = new SecretaryModel(params)
    const secretaryToUpdate = {
      ...secretary,
      id: secretaryExists.id,
      updated_at: new Date()
    }
    await this.secretariesRepository.update(secretaryToUpdate)
  }
}
