import { AdminDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel } from '@/models'
import { AdminsRepository } from '@/repositories'

export class CreateAdminsService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (params: AdminDTO): Promise<void> {
    const { cpf } = params
    const adminExists = await this.adminsRepository.findByCPF(cpf)
    if (adminExists) throw new RequestError('Administrador já existe.')
    const admin = new AdminModel(params)
    await this.adminsRepository.create(admin)
  }
}
