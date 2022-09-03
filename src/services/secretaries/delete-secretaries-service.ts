import { RequestError } from '@/errors'
import { SecretariesRepository } from '@/repositories'

export class DeleteSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (id: string): Promise<void> {
    const doctorExists = await this.secretariesRepository.findById(id)
    if (!doctorExists) throw new RequestError('Secretária não existe.')
    await this.secretariesRepository.delete(id)
  }
}
