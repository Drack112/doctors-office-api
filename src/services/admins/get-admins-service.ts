import { AdminsRepository } from '@/repositories'
import { AdminEntity } from '@/repositories/entities'

export class GetAdminsService {
  constructor (private readonly adminsRepository: AdminsRepository) {}

  async execute (): Promise<AdminEntity[]> {
    return await this.adminsRepository.get()
  }
}
