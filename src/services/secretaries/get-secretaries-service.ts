import { SecretariesRepository } from '@/repositories'
import { SecretaryEntity } from '@/repositories/entities'

export class GetSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (): Promise<SecretaryEntity[]> {
    return await this.secretariesRepository.get()
  }
}
