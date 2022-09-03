import { SecretaryDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class CreateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (params: SecretaryDTO): Promise<void> {
    const { email, cpf } = params
    const secretaryByEmail = await this.secretariesRepository.findByEmail(email)
    const secretaryByCPF = await this.secretariesRepository.findByCPF(cpf)
    if (secretaryByEmail ?? secretaryByCPF) throw new RequestError('Secretária já existe.')
    const secretary = new SecretaryModel(params)
    await this.secretariesRepository.create(secretary)
  }
}
