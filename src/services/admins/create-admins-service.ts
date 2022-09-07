import { AdminDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel } from '@/models'
import { AdminsRepository } from '@/repositories'

export class CreateAdminsService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (params: AdminDTO): Promise<void> {
    const { email, cpf } = params
    const adminByEmail = await this.adminsRepository.findByEmail(email)
    const adminByCPF = await this.adminsRepository.findByCPF(cpf)
    if (adminByEmail ?? adminByCPF) throw new RequestError('Administrador já existe.')
    const doctor = new AdminModel(params)
    await this.adminsRepository.create(doctor)
  }
}
