import { SecretaryDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { SecretaryModel } from '@/models'
import { SecretariesRepository } from '@/repositories'

export class UpdateSecretariesService {
  constructor (private readonly secretariesRepository: SecretariesRepository) {}

  async execute (id: string, params: SecretaryDTO): Promise<void> {
    const { email, cpf } = params
    await this.validateData(email, cpf)
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

  private async validateData (email: string, cpf: string): Promise<void> {
    const secretaryByEmail = await this.secretariesRepository.findByEmail(email)
    const secretaryByCPF = await this.secretariesRepository.findByCPF(cpf)
    if (secretaryByEmail ?? secretaryByCPF) throw new RequestError('Secretária já existe.')
  }
}
