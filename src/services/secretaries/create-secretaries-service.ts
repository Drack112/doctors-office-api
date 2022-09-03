import { SecretaryDTO } from '@/dtos'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class CreateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (params: SecretaryDTO): Promise<void> {
    const secretary = new SecretaryModel(params)
    await this.secretariesRepository.create(secretary)
  }
}
