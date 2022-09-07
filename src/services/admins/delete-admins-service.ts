import { RequestError } from '@/errors'
import { AdminsRepository } from '@/repositories'

export class DeleteAdminsService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (id: string): Promise<void> {
    const adminExists = await this.adminsRepository.findById(id)
    if (!adminExists) throw new RequestError('Administrador não existe.')
    await this.adminsRepository.delete(id)
  }
}
