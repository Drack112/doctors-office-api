import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'
import { AdminEntity } from '@/repositories/entities'

export class GetAdminsByIdService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (id: string): Promise<AdminEntity | null> {
    const admin = await this.adminsRepository.findById(id)
    if (!admin) throw new RequestError('Administrador não existe.')
    return admin
  }
}
