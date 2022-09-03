import { RequestError } from '@/errors'
import { SecretariesRepository } from '@/repositories'
import { SecretaryEntity } from '@/repositories/entities'

export class GetSecretariesByIdService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (id: string): Promise<SecretaryEntity | null> {
    const secretary = await this.secretariesRepository.findById(id)
    if (!secretary) throw new RequestError('Secretária não existe.')
    return secretary
  }
}
