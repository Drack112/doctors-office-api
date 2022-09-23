import { AdminDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel } from '@/models'
import { AdminsRepository } from '@/repositories'

export class UpdateAdminsService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (id: string, params: AdminDTO): Promise<void> {
    const adminExists = await this.adminsRepository.findById(id)
    if (!adminExists) throw new RequestError('Administrador não existe.')
    const admin = new AdminModel(params)
    const adminToUpdate = {
      ...admin,
      id: adminExists.id,
      created_at: adminExists.created_at,
      updated_at: new Date()
    }
    await this.adminsRepository.update(adminToUpdate)
  }
}
