import { SecretaryDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class CreateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (params: SecretaryDTO): Promise<void> {
    const { cpf } = params
    await this.validateData(cpf)
    const secretary = new SecretaryModel(params)
    await this.secretariesRepository.create(secretary)
  }

  private async validateData (cpf: string): Promise<void> {
    const secretaryByCPF = await this.secretariesRepository.findByCPF(cpf)
    if (secretaryByCPF) throw new RequestError('Secretária já existe.')
  }
}
