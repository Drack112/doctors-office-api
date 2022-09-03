import { SecretaryDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class CreateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (params: SecretaryDTO): Promise<void> {
    const { email, cpf } = params
    await this.validateData(email, cpf)
    const secretary = new SecretaryModel(params)
    await this.secretariesRepository.create(secretary)
  }

  private async validateData (email: string, cpf: string): Promise<void> {
    const secretaryByEmail = await this.secretariesRepository.findByEmail(email)
    const secretaryByCPF = await this.secretariesRepository.findByCPF(cpf)
    if (secretaryByEmail ?? secretaryByCPF) throw new RequestError('Secretária já existe.')
  }
}
